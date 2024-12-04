<template>
  <div class="flex flex-col bg-base-100 anchor container">
    <div
      class="flex-col items-center justify-between m-2 sm:mx-8 hidden xs:flex">
      <!-- 搜索 -->
      <label
        class="input input-sm relative ring-0 input-bordered w-full flex border-base-content items-center transition ease-in-out">
        <input
          type="text"
          class="grow ring-0 !outline-none"
          placeholder="搜一搜"
          v-model="searchValue"
          ref="searchRef" />

        <span
          class="icon-[lucide--x] size-4 absolute right-20"
          v-if="searchValue.length > 0"
          @click="searchValue = ''"></span>
        <div
          class="btn btn-xs btn-primary absolute right-2"
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
          @click="config.showIcon = !config.showIcon"
          :class="{ 'ring-1': config.showIcon }">
          <span class="icon-[lucide--image] size-6"></span>
        </button>
        <button
          class="btn ring-primary ring-0 btn-xs btn-ghost"
          @click="config.showTitle = !config.showTitle"
          :class="{ 'ring-1': config.showTitle }">
          <span class="icon-[lucide--rectangle-ellipsis] size-6"></span>
        </button>
      </div>
    </div>

    <!-- 结果显示 -->
    <div
      class="flex-1"
      v-if="config.scriptStores.length > 0">
      <div class="flex flex-col space-y-1">
        <div v-for="script in scripts">
          <div
            class="rounded-sm hover:ring flex items-center bg-base-100/70 drop-shadow-sm">
            <div class="flex items-center h-6 xs:h-8 justify-between w-full">
              <!-- 标题/icon -->
              <div
                class="flex flex-1 w-full items-center h-full xs:w-5/6"
                @dblclick="runScript(script)">
                <template v-if="script.icon && config.showIcon && !searchValue">
                  <div class="h-full min-w-max pr-3">
                    <img
                      :alt="script.name"
                      :src="script.icon"
                      class="h-full" />
                  </div>
                </template>
                <!-- <div class="ml-auto"></div> -->
                <div
                  class="truncate text-left select-none"
                  v-if="config.showTitle || !script.icon || searchValue">
                  {{ script.name }}
                </div>
              </div>
              <div class="ml-auto"></div>

              <div class="w-6 hidden xs:block">
                <span
                  v-if="script.star"
                  @click="changeStar(script, false)"
                  class="icon-[openmoji--star] size-5 sm:size-6"></span>
                <span
                  v-else
                  @click="changeStar(script, true)"
                  class="icon-[lucide--star] size-4 sm:size-5"></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        class="py-2 text-center"
        v-if="limit < config.scriptStores.length && !searchValue">
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
  import { useFuse } from "@vueuse/integrations/useFuse";
  import type { UseFuseOptions } from "@vueuse/integrations/useFuse";
  import type { FuseResult } from "fuse.js";

  import { Script } from "../../models";
  import { fs } from "../../lib/cep/node";
  import { asyncComputed } from "@vueuse/core";
  import { evalTS } from "../../lib/utils/bolt";

  const { config } = useConfig();

  const searchValue = ref("");

  const limit = ref(20);

  const searchResults = ref<FuseResult<Script>[]>([]);
  const searchRef = useTemplateRef<HTMLInputElement>("searchRef");

  const scripts = asyncComputed(() => {
    let tmpScripts = <Script[]>[];
    if (searchValue.value.trim() === "") {
      tmpScripts = config.value.scriptStores.slice(0, limit.value);
    } else {
      limit.value = 20;
      const { results } = useFuse(
        searchValue.value,
        config.value.scriptStores,
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
    document.querySelector(".anchor")?.scrollIntoView();
  }
  function changeStar(script: Script, status: boolean) {
    if (status) {
      config.value.starScripts.set(script.name, "1");

      script.star = true;
    } else {
      config.value.starScripts.delete(script.name);
      script.star = false;
    }
  }
  function runScript(script: Script) {
    evalTS("RunScript", script.path);
  }
</script>
