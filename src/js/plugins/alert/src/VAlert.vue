<template>
    <transition name="bounce">
        <div
            v-if="visible"
            ref="alertRef"
            :class="alertStyles[props.type as keyof typeof alertStyles].main"
            :key="Date.now().toString()"
            class="mt-4 relative font-bold flex-col border text-wrap flex min-w-60 max-w-[24rem] rounded-lg items-center">
            <div class="flex items-center w-full">
                <span class="w-4/5 py-2 pl-4 break-words">{{ alert }}</span>
                <component class="pl-4" :is="icon"></component>
            </div>
            <div class="flex w-full p-2">
                <button @click="handleCancel" class="ml-auto mx-2 btn btn-sm">取消</button>
                <button @click="handleConfirm" class="btn btn-sm btn-info">确认</button>
            </div>
        </div>
    </transition>
</template>

<script setup lang="ts">
import type { alertType } from './model'

import { onMounted, onBeforeUnmount, ref, type ComponentOptions, shallowRef } from 'vue'
import { alertStyles } from './model'

const props = defineProps<{
    type: alertType
    alert: string
    duration: number
    showClose: boolean
}>()

const visible = ref(false)
const alertRef = ref<HTMLElement | null>(null)
const icon = shallowRef<ComponentOptions | null>(null)

const emit = defineEmits<{
    (e: 'confirm'): void
    (e: 'cancel'): void
}>()

const handleCancel = () => {
    emit('cancel')
    visible.value = false
}

const handleConfirm = () => {
    emit('confirm')
    visible.value = false
}

onBeforeUnmount(() => {})
onMounted(() => {
    visible.value = true
    icon.value = alertStyles[props.type as alertType].icon
    if (props.duration > 0) {
        setTimeout(close, props.duration)
    }
})

function close() {
    visible.value = false
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
