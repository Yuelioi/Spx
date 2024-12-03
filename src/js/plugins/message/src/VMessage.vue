<template>
    <transition name="bounce" @after-leave="removeElement">
        <div
            v-if="visible"
            ref="messageRef"
            :class="messageStyles[props.type as keyof typeof messageStyles].main"
            :key="Date.now().toString()"
            class="mt-4 relative font-bold border text-wrap flex min-w-60 max-w-[24rem] rounded-lg items-center">
            <div class="flex items-center w-full">
                <span class="w-4/5 py-2 pl-4 break-words">{{ message }}</span>
                <component class="pl-4" :is="icon"></component>
                <BIconX @click="close" v-if="props.showClose"></BIconX>
            </div>
        </div>
    </transition>
</template>

<script setup lang="ts">
import type { messageType } from './model'

import { onMounted, onBeforeUnmount, ref, type ComponentOptions } from 'vue'
import { messageStyles } from './model'
import BIconX from './icons/IconX.vue'

const props = defineProps<{
    type: messageType
    message: string
    duration: number
    showClose: boolean
}>()

const visible = ref(false)
const messageRef = ref<HTMLElement | null>(null)

const icon = shallowRef<ComponentOptions | null>(null)

onBeforeUnmount(() => {})
onMounted(() => {
    visible.value = true
    icon.value = messageStyles[props.type as messageType].icon
    if (props.duration > 0) {
        setTimeout(close, props.duration)
    }
})

function close() {
    visible.value = false
}

function removeElement() {
    if (messageRef.value) {
        const messageDiv = messageRef.value.parentNode as HTMLElement
        messageDiv.parentNode?.removeChild(messageDiv)
    }
}
</script>

<style scoped>
.bounce-enter-active {
    animation: bounce-in 0.5s;
}
.bounce-leave-active {
    animation: bounce-out 0.5s;
}
@keyframes bounce-in {
    0% {
        transform: scale(0);
        transform: translateX(20px);
    }
    50% {
        transform: scale(1.1);
    }
    100% {
        transform: scale(1);
    }
}
@keyframes bounce-out {
    0% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.1);
    }
    100% {
        transform: scale(0);
        opacity: 0;
    }
}
</style>
