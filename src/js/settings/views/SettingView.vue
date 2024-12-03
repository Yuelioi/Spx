<template>
  <div class="container flex flex-col space-y-8">
    <div
      class="hidden backdrop-blur-md z-10 md:flex w-full flex-col p-6 space-y-4 bg-base-100/50 border border-neutral-content/50 rounded-md shadow-md">
      <div class="flex items-center">
        <span class="font-bold">脚本文件夹设置</span>

        <div class="ml-auto flex gap-4">
          <div
            class="btn btn-primary btn-sm"
            @click="addScript">
            添加脚本文件夹
          </div>
          <div
            class="btn btn-success btn-sm"
            @click="resetScript">
            重新读取
          </div>
        </div>
      </div>
      <div class="divider"></div>
      <table class="table">
        <thead>
          <tr>
            <th class="hidden md:block">序号</th>
            <th>名称</th>
          </tr>
        </thead>
        <tbody>
          <template
            v-for="(folder, index) in scriptFolders"
            :key="folder">
            <tr class="group">
              <th class="hidden md:block">{{ index + 1 }}</th>
              <td>
                <input
                  type="text"
                  class="w-full min-w-[13vw] input input-bordered"
                  :value="folder" />
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
  const store = useBasicStore();
  const { scriptFolders } = storeToRefs(store);

  function resetScript() {}
  function addScript() {}
  function removeScript() {}
</script>
