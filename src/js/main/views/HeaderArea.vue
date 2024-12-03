<template>
  <div class="relative wave flex items-center bg-base-200">
    <button
      class="btn btn-ghost self-center btn-sm"
      @click="switcher = 1">
      <span class="icon-[lucide--home] size-5"></span>
    </button>
    <div class="ml-auto"></div>
    <button
      class="btn btn-ghost btn-sm"
      @click="switcher = 2">
      <div
        class="tooltip tooltip-bottom"
        data-tip="设置">
        <span class="icon-[lucide--settings] size-5"></span>
      </div>
    </button>

    <button class="btn btn-ghost btn-sm">
      <label class="swap swap-rotate">
        <input
          type="checkbox"
          class="theme-controller" />
        <span
          class="icon-[lucide--sun] size-5 swap-on fill-current"
          @click="changeTheme()"></span>
        <span
          class="icon-[lucide--moon] size-5 swap-off fill-current mr-4"
          @click="changeTheme()"></span>
      </label>
    </button>
  </div>
</template>

<script setup lang="ts">
  const store = useBasicStore();
  const { theme } = storeToRefs(store);

  let switcher = defineModel();

  const { switchTheme } = useTheme(["light", "dark"]);
  const emit = defineEmits(["updateSwitcher"]);

  function changeTheme() {
    console.log(theme.value);
    theme.value = theme.value == "light" ? "dark" : "light";
    switchTheme(theme.value);
  }
</script>
