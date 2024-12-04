import { ref, watch } from "vue";
import { Script } from "../models";
import { fs } from "../lib/cep/node";

export interface Config {
  theme: string;
  scriptFolders: string[];
  iconFolders: string[];
  starScripts: Map<string, string>;
  scriptStores: Script[];
  iconStores: Map<string, string>;
  showTitle: boolean;
  showIcon: boolean;
}

const config = ref<Config>({
  theme: "",
  scriptFolders: [],
  iconFolders: [],
  starScripts: new Map(),
  scriptStores: [],
  iconStores: new Map(),
  showTitle: false,
  showIcon: false,
});

const configPath = ref("");

let isWriting = false;

// 请确保文件存在
export function useConfig(filepath: string = "") {
  if (filepath) {
    configPath.value = filepath;
    const data = fs.readFileSync(filepath, "utf-8");
    const p = JSON.parse(data);
    console.log(p);

    if (p) {
      config.value = p;

      if (Array.isArray(p.starScripts)) {
        config.value.starScripts = new Map(p.starScripts);
      }
      if (Array.isArray(p.iconStores)) {
        config.value.iconStores = new Map(p.iconStores);
      }
    }
  }

  watch(
    config,
    () => {
      if (!isWriting) {
        isWriting = true;
        console.log(configPath.value);

        setTimeout(() => {
          isWriting = false;
        }, 1000);

        try {
          const serializedConfig = JSON.stringify(
            config.value,
            (key, value) => {
              if (value instanceof Map) {
                // 将 Map 转换为数组形式
                return Array.from(value);
              }
              return value;
            }
          );

          fs.writeFileSync(configPath.value, serializedConfig, "utf-8");
        } catch (e) {
          console.log(e);
        }
      }
    },
    { deep: true }
  );

  return { config };
}
