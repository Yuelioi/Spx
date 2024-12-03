<template>
  <div class="container w-full flex flex-col space-y-4">
    <div
      class="backdrop-blur-md w-full flex-col mt-4 p-4 space-y-4 bg-base-100/50 border border-neutral-content/50 rounded-md shadow-md">
      <div class="flex items-center">
        <span>脚本设置</span>
        <div class="ml-auto flex gap-1">
          <div
            class="btn btn-primary btn-xs"
            @click="addScriptFolder">
            +脚本
          </div>
          <div
            class="btn btn-primary btn-xs"
            @click="addIconFolder">
            +图标
          </div>
          <div
            class="btn btn-success btn-xs"
            @click="reload()">
            重载
          </div>
        </div>
      </div>

      <table class="table">
        <thead>
          <tr>
            <th>名称</th>
            <th>路径</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <template
            v-for="(folder, index) in scriptFolders"
            :key="folder">
            <tr class="group">
              <td>脚本</td>
              <td>
                <input
                  type="text"
                  disabled
                  class="w-full input input-sm input-bordered"
                  :value="folder" />
              </td>
              <td>
                <button
                  class="btn btn-sm btn-error"
                  @click="deleteFolder(index)">
                  删除
                </button>
              </td>
            </tr>
          </template>
          <template
            v-for="(folder, index) in iconFolders"
            :key="folder">
            <tr class="group">
              <td>图标</td>
              <td>
                <input
                  type="text"
                  disabled
                  class="w-full input input-sm input-bordered"
                  :value="folder" />
              </td>
              <td>
                <button
                  class="btn btn-sm btn-error"
                  @click="deleteIconFolder(index)">
                  删除
                </button>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { selectFolder } from "../../lib/utils/bolt";
  import { fs } from "../../lib/cep/node";
  import { VAlert } from "../../plugins/alert";
  import { Message } from "../../plugins/message";
  const store = useBasicStore();
  const { scriptFolders, iconFolders } = storeToRefs(store);

  import { readScripts, readIcons } from "@/utils/startup";

  function addScriptFolder() {
    selectFolder("", "请选择脚本文件夹", function (res: string) {
      const ok = fs.existsSync(res);

      if (!ok) {
        return;
      }
      // 判断是否重复
      const ok2 = scriptFolders.value.includes(res);
      if (ok2) {
        Message({ message: "文件夹重复啦" });
        return;
      }

      scriptFolders.value.push(res);
    });
  }
  function deleteFolder(index: number) {
    VAlert({ alert: "真的要删除吗" }).then((res) => {
      if (res) {
        scriptFolders.value.splice(index, 1);
      }
    });
  }

  function addIconFolder() {
    selectFolder("", "请选择图标文件夹", function (res: string) {
      const ok = fs.existsSync(res);

      if (!ok) {
        return;
      }
      // 判断是否重复
      const ok2 = iconFolders.value.includes(res);
      if (ok2) {
        Message({ message: "文件夹重复啦" });
        return;
      }

      iconFolders.value.push(res);
    });
  }
  function deleteIconFolder(index: number) {
    VAlert({ alert: "真的要删除吗" }).then((res) => {
      if (res) {
        iconFolders.value.splice(index, 1);
      }
    });
  }

  function reload() {
    readIcons(true);
    readScripts(true);
  }
</script>
