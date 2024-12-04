<template>
  <div class="w-full h-full">
    <HeaderArea
      class="h-10"
      v-model="switcher"
      @update-switcher="updateSwitcher" />
    <KeepAlive>
      <HomeView
        class="flex-1 w-full"
        v-if="switcher == 1"></HomeView>
    </KeepAlive>
    <KeepAlive>
      <SettingView
        class="flex-1 w-full"
        v-if="switcher == 2"></SettingView>
    </KeepAlive>
  </div>
</template>

<script setup lang="ts">
  import { loadConfig, readIcons, readScripts } from "../utils/startup";

  const switcher = ref(1);

  function updateSwitcher(newVal: number) {
    switcher.value = newVal;
  }

  const { switchTheme } = useTheme(["light", "dark"]);
  const emit = defineEmits(["updateSwitcher"]);

  const store = useBasicStore();
  const { configPath } = storeToRefs(store);

  onBeforeMount(async () => {
    // 优先加载配置
    await loadConfig();

    // 第一次获取配置
    const { config } = useConfig(configPath.value);
    // 加载主题
    switchTheme(config.value.theme);

    // 加载脚本
    readIcons();
    readScripts();
  });
</script>
