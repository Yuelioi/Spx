<template>
  <div
    class="cursor-pointer group hover:ring-1 ring-primary border backdrop-blur-md"
    v-for="collection in collections.slice(0, max)">
    <div class="p-2 h-10">
      <div
        class="flex flex-row items-center relative"
        @click="">
        <!-- 图标 -->
        <div class="avatar static size-6">
          <div class="h-full rounded-xl">
            <img
              :alt="collection.name"
              :src="collection.id + '.png'"
              @error="imageLoadError"
              class="h-full rounded-full" />
            <div
              class="rounded-full flex h-full items-center justify-center bg-primary">
              <span class="font-bold text-md">{{ collection.name[0] }}</span>
            </div>
          </div>
        </div>
        <!-- 名称 -->
        <div class="pl-4 flex-1 flex justify-between">
          <div class="items-center flex space-x-2">
            <span class="font-bold line-clamp-1">{{ collection.name }}</span>
          </div>
        </div>

        <!-- 描述 -->

        <div class="flex text-left text-sm">
          <span class="line-clamp-1">{{ collection.description }}</span>
        </div>

        <!-- 收藏 -->

        <div class="ml-auto space-x-2">
          <span
            v-if="collection.star"
            class="icon-[line-md--star-filled] bg-warning size-5"
            @click="star(collection)"></span>
          <span
            v-else
            class="icon-[lucide--star] size-5"
            @click="star(collection)"></span>
        </div>
      </div>
    </div>
  </div>

  <div
    class="col-start-1 col-span-full text-center w-full my-4"
    v-if="collections.length > max"
    @click="max = max + limit">
    <div class="btn btn-outline btn-sm">显示更多</div>
  </div>
</template>

<script setup lang="ts">
  import type { Script } from "../../models";

  import { imageLoadError } from "@/utils";

  const store = useBasicStore();

  let limit = 10;

  const max = ref(limit);

  const props = defineProps<{
    collections: Script[];
  }>();

  async function star(collection: Script) {
    // const id = starCollectionsList.value.findIndex((ele: Collection) => {
    //   return ele.cid === collection.cid
    // })
    // if (id == -1) {
    //   // 将 collection 转换为可序列化的对象
    //   const serializableCollection = {
    //     id: collection.cid,
    //     cid: collection.cid,
    //     name: collection.name,
    //     description: collection.description,
    //     link: collection.link,
    //     favicon: collection.favicon,
    //     star: true
    //   }
    //   collection.star = true
    // }
  }
</script>
<style scoped>
  .tooltip:before {
    --tooltip-color: rgb(55 55 55);
  }
</style>
