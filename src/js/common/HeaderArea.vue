<template>
  <div
    class="relative wave flex items-center h-10 bg-base-200 overflow-hidden !py-0">
    <button
      class="btn btn-ghost self-center btn-sm"
      @click="">
      <span class="icon-[lucide--home] size-5"></span>
    </button>

    <div class="ml-auto"></div>
    <button
      class="btn btn-ghost btn-sm"
      @click="">
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
          class="icon-[lucide--moon] size-5 swap-off fill-current"
          @click="changeTheme()"></span>
      </label>
    </button>
  </div>
</template>

<script setup lang="ts">
  const store = useBasicStore();
  const { theme } = storeToRefs(store);

  const { switchTheme } = useTheme(["light", "dark"]);

  function changeTheme() {
    console.log(theme.value);
    theme.value = theme.value == "light" ? "dark" : "light";
    switchTheme(theme.value);
  }
</script>
