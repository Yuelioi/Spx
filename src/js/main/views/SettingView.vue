<template>
  <div class="container w-full flex flex-col space-y-4 bg-base-100">
    <div
      class="backdrop-blur-md w-full flex-col mt-4 p-4 space-y-4 bg-base-100/50 border border-neutral-content/50 rounded-md shadow-md">
      <div class="flex items-center">
        <span>脚本设置</span>
        <div class="ml-auto flex space-x-1">
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
            v-for="(folder, index) in config.scriptFolders"
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
            v-for="(folder, index) in config.iconFolders"
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

    <div
      class="backdrop-blur-md w-full flex-col mt-4 p-4 space-y-4 bg-base-100/50 border border-neutral-content/50 rounded-md shadow-md">
      <div class="flex flex-col">
        <div class="p-2 font-bold">添加脚本/图标</div>
        <DragBox :title="'图标/脚本'"></DragBox>
      </div>
    </div>
    <div
      class="backdrop-blur-md w-full flex-col mt-4 p-4 space-y-4 bg-base-100/50 border border-neutral-content/50 rounded-md shadow-md">
      <div class="flex flex-col">
        <div class="p-2 font-bold">使用说明</div>
        <li class="p-2">
          为了防止误触, 脚本为
          <span class="text-error">双击</span>
          运行
        </li>
        <li class="p-2">选择脚本文件, 然后再选图片文件夹, 单击重载即可</li>
        <li class="p-2">
          脚本后缀为
          <span class="text-error">jsx/jsxbin</span>
        </li>
        <li class="p-2">
          脚本图片需要和脚本名一致, 后缀为
          <span class="text-error">png/jpg/gif</span>
        </li>
        <li class="p-2">上传脚本/图片 默认上传第一个文件夹</li>
        <li class="p-2">
          <div class="inline-flex items-center">
            兼容
            <span class="icon-[fa6-brands--bilibili] px-3"></span>
            <span
              @click="
                csi.openURLInDefaultBrowser(
                  'https://space.bilibili.com/8993755'
                )
              "
              class="link link-primary">
              AKAMEI
            </span>
            脚本集
          </div>
        </li>
        <li class="p-2">兼容 AE2020+</li>
        <li class="p-2">如果无法切输入法, 请关闭拓展, 可以试试重新打开拓展</li>
      </div>
    </div>
    <div
      class="backdrop-blur-md w-full flex-col mt-4 p-4 space-y-4 bg-base-100/50 border border-neutral-content/50 rounded-md shadow-md">
      <div class="flex flex-col">
        <div class="font-bold p-2">关于</div>
        <div class="p-2 flex items-center space-x-2">
          <span class="icon-[qlementine-icons--version-control-16]"></span>
          <span>版本: V0.0.2</span>
        </div>
        <div class="p-2 flex items-center space-x-2">
          <span class="icon-[fa6-brands--bilibili]"></span>
          <span
            @click="
              csi.openURLInDefaultBrowser('https://space.bilibili.com/4279370')
            "
            class="link link-primary">
            作者: 月离离离离
          </span>
        </div>
        <div class="p-2">
          Copyright © 2024
          <span
            @click="csi.openURLInDefaultBrowser('https://www.yuelili.com')"
            class="link link-primary">
            月离万事屋
            <span class="icon-[lucide--external-link]"></span>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { csi, selectFolder } from "../../lib/utils/bolt";
  import { fs } from "../../lib/cep/node";
  import { VAlert } from "../../plugins/alert";
  import { Message } from "../../plugins/message";

  const { config } = useConfig();

  import { readScripts, readIcons } from "@/utils/startup";

  function addScriptFolder() {
    selectFolder("", "请选择脚本文件夹", function (res: string) {
      const ok = fs.existsSync(res);

      if (!ok) {
        return;
      }
      // 判断是否重复
      const ok2 = config.value.scriptFolders.includes(res);
      if (ok2) {
        Message({ message: "文件夹重复啦" });
        return;
      }

      config.value.scriptFolders.push(res);
    });
  }
  function deleteFolder(index: number) {
    VAlert({ alert: "真的要删除吗" }).then((res) => {
      if (res) {
        config.value.scriptFolders.splice(index, 1);
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
      const ok2 = config.value.iconFolders.includes(res);
      if (ok2) {
        Message({ message: "文件夹重复啦" });
        return;
      }

      config.value.iconFolders.push(res);
    });
  }
  function deleteIconFolder(index: number) {
    VAlert({ alert: "真的要删除吗" }).then((res) => {
      if (res) {
        config.value.iconFolders.splice(index, 1);
      }
    });
  }

  function reload() {
    readIcons(true);
    readScripts(true);
  }
</script>
