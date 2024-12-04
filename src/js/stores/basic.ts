import { defineStore } from "pinia";

import { ref } from "vue";

import { Config } from "../hooks/useConfig";

export const useBasicStore = defineStore("basic", () => {
  const extFolderPath = ref("");
  const configPath = ref("");
  let config = ref<Config>();

  return {
    extFolderPath,
    config,
    configPath,
  };
});
