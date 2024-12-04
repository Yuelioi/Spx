import { fs, os, path } from "../../lib/cep/node";
import { evalTS } from "../../lib/utils/bolt";
import { Message } from "../../plugins/message";

const defaultConfig = {
  theme: "light",
  scriptFolders: [],
  iconFolders: [],
  starScripts: [],
  scriptStores: [],
  iconStores: [],
  showTitle: true,
  showIcon: true,
};

// 必须先加载配置
export async function loadConfig() {
  const store = useBasicStore();
  let { extFolderPath, configPath } = storeToRefs(store);

  extFolderPath.value = await evalTS("getExtensionFolderPath");

  const cFolder = path.join(extFolderPath.value, "configs");
  const cPath = path.join(cFolder, "config.json");
  if (!fs.existsSync(cFolder)) {
    console.log(1);

    fs.mkdirSync(path.join(extFolderPath.value, "configs"));
  }
  if (!fs.existsSync(cPath)) {
    console.log(2);
    fs.writeFileSync(cPath, JSON.stringify(defaultConfig));
  }

  configPath.value = cPath;
}

export function readIcons(showMessage = false) {
  const { config } = useConfig();

  config.value.iconFolders.forEach((folder: string) => {
    const files = fs.readdirSync(folder);
    files.forEach((file) => {
      if (
        file.endsWith(".png") ||
        file.endsWith(".jpg") ||
        file.endsWith(".gif")
      ) {
        const ext = path.extname(file);
        const name = path.basename(file, ext);
        config.value.iconStores.set(name, path.join(folder, file));
      }
    });
  });

  if (showMessage) {
    Message({ message: "读取图标成功" });
  }
}

export function readScripts(showMessage = false) {
  const { config } = useConfig();

  config.value.scriptStores = [];
  config.value.scriptFolders.forEach((folder: string) => {
    const files = fs.readdirSync(folder);
    files.forEach((file) => {
      if (file.endsWith(".jsx") || file.endsWith(".jsxbin")) {
        const ext = path.extname(file);
        const name = path.basename(file, ext);
        let star = false;
        const icon = config.value.iconStores.get(name);

        if (config.value.starScripts.get(name)) {
          star = true;
        }

        const scriptPath = path.join(folder, file);

        config.value.scriptStores.push({
          name: name,
          icon: icon,
          path: scriptPath,
          show: true,
          star: star,
          order: 0,
        });
      }
    });
  });

  if (showMessage) {
    Message({ message: "读取脚本成功" });
  }
}
