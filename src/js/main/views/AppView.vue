<template>
  <div class="w-full h-full">
    <HeaderArea
      class="h-10"
      v-model="switcher"
      @update-switcher="updateSwitcher" />

    <HomeView
      class="flex-1 w-full"
      v-if="switcher == 1"></HomeView>
    <SettingView
      class="flex-1 w-full"
      v-if="switcher == 2"></SettingView>
  </div>
</template>

<script setup lang="ts">
  import { readIcons, readScripts } from "../utils/startup";

  const switcher = ref(1);

  function updateSwitcher(newVal: number) {
    switcher.value = newVal;
  }

  onBeforeMount(() => {
    const store = useBasicStore();
    const { scriptStores } = storeToRefs(store);
    readIcons();
    readScripts();
    console.log(scriptStores.value);
  });
</script>
