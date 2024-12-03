import { fs, path } from "../../lib/cep/node";
import { Message } from "../../plugins/message";

export function readScripts(showMessage = false) {
  const store = useBasicStore();
  const { scriptFolders, scriptStores, iconStores } = storeToRefs(store);

  scriptStores.value = [];
  scriptFolders.value.forEach((folder: string) => {
    const files = fs.readdirSync(folder);
    files.forEach((file) => {
      if (file.endsWith(".jsx") || file.endsWith(".jsxbin")) {
        const ext = path.extname(file);
        const name = path.basename(file, ext);

        const icon = iconStores.value.get(name);

        scriptStores.value.push({
          name: name,
          icon: icon,
          path: file,
          show: true,
          star: false,
          order: 0,
        });
      }
    });
  });

  if (showMessage) {
    Message({ message: "读取脚本成功" });
  }
}

export function readIcons(showMessage = false) {
  const store = useBasicStore();
  const { iconFolders, iconStores } = storeToRefs(store);

  iconStores.value = new Map();
  iconFolders.value.forEach((folder: string) => {
    const files = fs.readdirSync(folder);
    files.forEach((file) => {
      if (
        file.endsWith(".png") ||
        file.endsWith(".jpg") ||
        file.endsWith(".gif")
      ) {
        const ext = path.extname(file);
        const name = path.basename(file, ext);
        iconStores.value.set(name, path.join(folder, file));
      }
    });
  });

  if (showMessage) {
    Message({ message: "读取图标成功" });
  }
}
