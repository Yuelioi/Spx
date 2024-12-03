<template>
  <div class="flex flex-col bg-base-100 anchor">
    <div class="flex-col items-center justify-between m-4 mx-8 hidden sm:flex">
      <!-- 搜索 -->
      <label
        class="input input-sm ring-0 input-bordered w-full flex border-base-content items-center transition ease-in-out">
        <input
          type="text"
          class="grow ring-0 !outline-none"
          placeholder="搜一搜"
          v-model="searchValue"
          ref="searchRef" />

        <span
          class="icon-[lucide--x] size-4"
          v-if="searchValue.length > 0"
          @click="searchValue = ''"></span>
        <div
          class="btn btn-xs btn-primary"
          @click="">
          搜索
          <span class="icon-[lucide--search]"></span>
        </div>
      </label>
    </div>

    <div class="justify-end mr-8 mb-4 hidden sm:flex">
      <div class="w-20 justify-between flex items-center space-x-2">
        <button
          class="btn ring-primary ring-0 btn-xs btn-ghost"
          @click="showIcon = !showIcon"
          :class="{ 'ring-1': showIcon }">
          <span class="icon-[lucide--image] size-6"></span>
        </button>
        <button
          class="btn ring-primary ring-0 btn-xs btn-ghost"
          @click="showTitle = !showTitle"
          :class="{ 'ring-1': showTitle }">
          <span class="icon-[lucide--rectangle-ellipsis] size-6"></span>
        </button>
      </div>
    </div>

    <!-- 结果显示 -->
    <div
      class="flex-1"
      v-if="scriptStores.length > 0">
      <div class="flex flex-col space-y-1 mx-4">
        <div
          v-for="script in scripts"
          @click="runScript(script)">
          <div
            class="rounded-sm hover:ring flex items-center bg-base-100/70 drop-shadow-sm">
            <div class="flex items-center h-8 xs:h-12 justify-between w-full">
              <!-- 标题/icon -->
              <div class="flex flex-1 w-full items-center h-full xs:w-5/6">
                <template v-if="script.icon && showIcon">
                  <div
                    class="tooltip tooltip-right h-full min-w-max pr-3"
                    :data-tip="script.name">
                    <img
                      :alt="script.name"
                      loading="lazy"
                      :src="script.icon"
                      class="h-full" />
                  </div>
                </template>
                <div class="ml-auto"></div>
                <div
                  class="truncate"
                  v-if="showTitle || !script.icon">
                  {{ script.name }}
                </div>
              </div>
              <div class="ml-auto"></div>

              <div
                @click="script.star = !script.star"
                class="w-6 hidden sm:block">
                <span
                  v-if="script.star"
                  class="icon-[openmoji--star] size-6"></span>
                <span
                  v-else
                  class="icon-[lucide--star] size-5"></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        class="py-2 text-center"
        v-if="limit < scriptStores.length">
        <div
          class="btn btn-sm"
          @click="limit += 20">
          显示更多
        </div>
        <div
          class="btn btn-sm"
          @click="scrollToTop">
          返回顶部
        </div>
      </div>
    </div>

    <!-- 无结果 -->
    <div
      class="select-none"
      v-else>
      <div class="p-4 rounded-md shadow-sm hover:shadow-md">
        <div>
          还没有脚本哦, 请在
          <span class="font-bold px-2">"设置>脚本管理"</span>
          添加
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  const store = useBasicStore();
  const { scriptStores, showTitle, showIcon } = storeToRefs(store);
  import { useFuse } from "@vueuse/integrations/useFuse";
  import type { UseFuseOptions } from "@vueuse/integrations/useFuse";
  import type { FuseResult } from "fuse.js";

  import { Script } from "../../models";
  import { fs } from "../../lib/cep/node";
  import { asyncComputed } from "@vueuse/core";

  const searchValue = ref("");

  const limit = ref(20);

  const searchResults = ref<FuseResult<Script>[]>([]);
  const searchRef = useTemplateRef<HTMLInputElement>("searchRef");

  const scripts = asyncComputed(() => {
    let tmpScripts = <Script[]>[];
    if (searchValue.value.trim() === "") {
      tmpScripts = scriptStores.value.slice(0, limit.value);
    } else {
      limit.value = 20;
      const { results } = useFuse(
        searchValue.value,
        scriptStores.value,
        options
      );
      searchResults.value = results.value;
      const scriptResults = <Script[]>[];
      results.value.forEach((ele) => {
        scriptResults.push(ele.item);
      });

      tmpScripts = scriptResults;
    }

    tmpScripts.forEach(async (script) => {
      if (script.icon?.startsWith("data")) {
        return;
      }

      if (script.icon && fs.existsSync(script.icon)) {
        let iconData = "";

        iconData = await readImage(script.icon);
        iconData = "data:image/jpeg;base64," + iconData;
        script.icon = iconData;
      } else {
        script.icon = "";
      }
    });

    tmpScripts.sort((a, b) => {
      if (a.star === true) {
        return -1;
      }
      if (b.star) {
        return 1;
      }
      return 0;
    });

    return tmpScripts;
  });

  function readImage(src: string | undefined): Promise<string> {
    if (src === undefined) return Promise.resolve("");

    if (!fs.existsSync(src)) return Promise.resolve("");

    const fileBuffer = fs.readFileSync(src);
    const fileBuffer64 = fileBuffer.toString("base64");
    return Promise.resolve(fileBuffer64);
  }

  const options = computed<UseFuseOptions<Script>>(() => ({
    fuseOptions: {
      keys: ["name", "description"],
      includeScore: true,
      shouldSort: true,
      threshold: 0.2,
    },
    resultLimit: 20,
  }));

  function scrollToTop() {
    console.log(document.querySelector(".anchor"));

    document.querySelector(".anchor")?.scrollIntoView();
  }

  function runScript(script: Script) {}
</script>

<style scoped></style>
