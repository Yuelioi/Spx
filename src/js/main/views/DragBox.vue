<template>
  <!-- 图标 -->
  <div
    class="flex border rounded-lg input-bordered items-center select-none w-full focus-within:outline-info"
    contenteditable="true">
    <div class="flex items-center justify-center w-full relative h-36">
      <div class="absolute inset-3 left-4 w-fit">
        <div class="flex items-center justify-center space-x-2">
          <span class="select-none">{{ title }}</span>
          <span class="icon-[lucide--image]"></span>
        </div>
      </div>

      <div
        class="flex w-full h-full items-center justify-center"
        @drop.prevent="handleDrag">
        <button
          aria-label="上传"
          class="h-full inline-flex bg-transparent items-center space-x-4 focus:outline-none"
          @click="openFileInput">
          <span class="select-none">拖拽/上传(支持多文件)</span>
          <span class="icon-[lucide--arrow-big-up-dash] size-8"></span>
        </button>
        <input
          type="file"
          @change="onFileChange"
          ref="fileInput"
          accept="file"
          class="hidden" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  defineProps({
    title: {
      type: String,
      required: false,
      default: "图标",
    },
  });

  import { fs, path } from "../../lib/cep/node";
  import { Message } from "../../plugins/message";

  const { config } = useConfig();
  const fileInput = useTemplateRef<HTMLInputElement | null>("fileInput");

  // 模拟打开对话框
  function openFileInput() {
    if (fileInput.value) {
      fileInput.value.click();
    }
  }

  // 检测打开文件
  function onFileChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const files = target.files;
    if (files) {
      handleFiles(files);
    }
  }

  // 处理拖拽图片事件
  function handleDrag(event: DragEvent) {
    const files = event.dataTransfer?.files;
    if (files) {
      handleFiles(files);
    }
  }

  function handleFiles(files: FileList) {
    for (let i = 0; i < files.length; i++) {
      handleFile(files[i]);
    }
  }

  // 显示
  function handleFile(file: File | null | undefined) {
    if (file) {
      if (file.type.startsWith("image")) {
        handleCopy(config.value.iconFolders, file, "图标");
      } else if (file.name.endsWith(".jsx") || file.name.endsWith(".jsxbin")) {
        handleCopy(config.value.scriptFolders, file, "脚本");
      }
    }
  }

  function handleCopy(folders: string[], file: File, filetype: string) {
    if (folders.length == 0) {
      Message({ message: "请先选择" + filetype + "文件夹" });
      return;
    }

    const iconFolder = folders[0];

    if (!fs.existsSync(iconFolder)) {
      Message({ message: filetype + "文件夹不存在" });
      return;
    }
    // @ts-ignore
    const trgPath = path.join(iconFolder, path.basename(file.path));
    try {
      // @ts-ignore
      fs.copyFileSync(file.path, trgPath);
      Message({ message: "上传成功", duration: 500 });
    } catch (e: any) {
      Message({ message: e.message });
    }
  }
</script>
