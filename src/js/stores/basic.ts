import { defineStore } from "pinia";

import { useStorage } from "@vueuse/core";

import { Script } from "../models/index";

export const useBasicStore = defineStore("basic", () => {
  const theme = useStorage("theme", "light");
  const token = useStorage("token", "");
  const scriptFolders = useStorage<string[]>("scriptFolders", []);

  const scriptStores = ref<Script[]>([]);

  scriptStores.value.push({
    id: "111111",
    name: "11111",
    path: "1111111111111111111111111",
    show: false,
    star: false,
    order: 0,
  });
  scriptStores.value.push({
    id: "222222",
    name: "22222222",
    path: "22222222222222222222222222222",
    show: false,
    star: false,
    order: 0,
  });

  return {
    token,
    theme,
    scriptStores,
    scriptFolders,
  };
});
