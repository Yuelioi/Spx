<template>
  <div class="container h-full flex flex-col">
    <!-- 搜索 -->
    <HomeSearch class="mt-4 px-4 relative"></HomeSearch>

    <div
      class="relative flex-1 p-4 overflow-y-scroll"
      v-if="scriptStores.length > 0">
      <GroupCard :collections="scriptStores"></GroupCard>
    </div>
    <div
      class="select-none"
      v-else>
      <div class="card rounded-md shadow-sm hover:shadow-md">
        <div class="card-body"></div>
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
  import GroupCard from "@/components/GroupCard.vue";
  import HomeSearch from "@/components/HomeSearch.vue";
  const store = useBasicStore();
  const { scriptStores } = storeToRefs(store);
  console.log(scriptStores.value);
</script>
