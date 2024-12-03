<template>
  <Teleport to="body">
    <transition name="fade">
      <div
        v-if="show"
        class="fixed top-0 left-0 z-40 w-screen h-screen bg-base-300 opacity-50"></div>
    </transition>
    <transition name="bounce">
      <div v-if="show" class="fixed inset-0 flex items-center justify-center z-50">
        <div
          ref="dialogRef"
          class="overflow-hidden bg-base-100/50 backdrop-blur-md p-4 flex flex-col rounded-lg shadow-lg overflow-y-auto">
          <header class="flex px-4 py-2 items-center text-sm justify-between">
            <slot name="header">
              <span class="font-bold text-base-content">{{ title }}</span>
            </slot>
            <span class="icon-[ic--round-close] size-6 mx-1" @click="show = false"></span>
          </header>
          <div class="border my-1"></div>
          <main class="text-base-content overflow-y-auto">
            <slot></slot>
          </main>
          <footer>
            <slot name="footer"></slot>
          </footer>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<script lang="ts" setup>
defineProps({
  title: {
    type: String,
    required: false
  }
})

const show = defineModel('show', { default: false, required: true })
const dialogRef = ref<HTMLElement | null>(null)

const handleClickOutside = (e: MouseEvent) => {
  if (dialogRef.value && !dialogRef.value.contains(e.target as Node)) {
    show.value = false
  }
}

onMounted(() => {
  document.body.classList.add('dialog')
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.body.classList.remove('dialog')
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.bounce-enter-active {
  animation: bounce-in 0.5s;
}

.bounce-leave-active {
  animation: bounce-in 0.1s reverse;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}
</style>
