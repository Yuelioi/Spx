import { defineStore } from "pinia";

import { useStorage } from "@vueuse/core";

import { Script } from "../models/index";
import { ref } from "vue";

export const useBasicStore = defineStore("basic", () => {
  const theme = useStorage("theme", "light");
  const token = useStorage("token", "");
  const scriptFolders = useStorage<string[]>("scriptFolders", []);
  const iconFolders = useStorage<string[]>("iconFolders", []);

  const scriptStores = ref<Script[]>([]);
  const iconStores = ref<Map<string, string>>(new Map());

  const showTitle = useStorage("showTitle", true);
  const showIcon = useStorage("showIcon", true);

  return {
    token,
    showTitle,
    showIcon,
    theme,
    iconFolders,
    scriptStores,
    scriptFolders,
    iconStores,
  };
});
