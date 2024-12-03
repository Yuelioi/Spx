<template>
  <div class="flex w-full justify-center">
    <div class="w-full flex flex-col items-center">
      <label
        class="input input-sm ring-0 input-bordered w-full flex border-base-content items-center transition ease-in-out">
        <input
          type="text"
          class="grow ring-0 !outline-none"
          placeholder="搜一搜"
          v-model="searchValue"
          ref="searchRef"
          @input="handleSearchChange" />

        <span
          class="icon-[lucide--x] size-4 mx-3"
          v-if="searchValue.length > 0"
          @click="searchValue = ''"></span>
        <div
          class="btn btn-xs btn-primary"
          @click="">
          搜索
          <span class="icon-[lucide--search]"></span>
        </div>
      </label>

      <div
        class="relative w-full"
        v-if="searchValue.length > 0 && searchResults.length > 0">
        <div
          class="absolute flex w-full items-center justify-center shadow-lg bg-base-100">
          <div
            class="h-96 z-10 w-full overflow-y-scroll flex flex-col space-y-4">
            <div
              class="m-4"
              v-for="item in searchResults"
              @click="">
              <div
                class="p-4 rounded-lg flex items-center space-x-3 bg-base-100/70 drop-shadow-md">
                <div class="">
                  <span class="icon-[lucide--menu] size-5"></span>
                </div>
                <div class="flex flex-col flex-1">
                  <div class="flex justify-between w-full">
                    <span class="font-bold text-lg">{{ item.item.name }}</span>
                    <div class="avatar static size-8">
                      <div class="h-full rounded-xl">
                        <img
                          :alt="item.item.name"
                          loading="lazy"
                          height="320"
                          :src="
                            'https://cdn.yuelili.com/nav/icons/' +
                            item.item.id +
                            '.png'
                          "
                          @error="imageLoadError"
                          class="h-full rounded-full" />
                        <div
                          class="rounded-full flex h-full items-center justify-center bg-purple-200">
                          <span class="font-bold text-lg">
                            {{ item.item.name[0] }}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="line-clamp-1 w-4/5 opacity-75">
                    {{ item.item.description }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useFuse } from "@vueuse/integrations/useFuse";
  import type { UseFuseOptions } from "@vueuse/integrations/useFuse";
  import type { FuseResult } from "fuse.js";
  import { imageLoadError } from "@/utils";
  import { Script } from "../../models";

  const store = useBasicStore();

  const { scriptStores } = storeToRefs(store);

  const showSearch = ref(false);

  const searchValue = ref("");

  const searchResults = ref<FuseResult<Script>[]>([]);
  const searchRef = useTemplateRef<HTMLInputElement>("searchRef");

  const options = computed<UseFuseOptions<Script>>(() => ({
    fuseOptions: {
      keys: ["name", "description"],
      includeScore: true,
      shouldSort: true,
      threshold: 0.2,
    },
    resultLimit: 20,
  }));

  function handleSearchChange() {
    if (searchValue.value !== "") {
      const { results } = useFuse(
        searchValue.value,
        scriptStores.value,
        options
      );
      searchResults.value = results.value;
      showSearch.value = true;
    } else {
      searchResults.value = [];
    }
  }
</script>

<style scoped>
  .tab-active {
    color: #fff;
  }
</style>
