// import { createVNode, render } from 'vue'
// import VNotification from './VMessage.vue'

import type { ExtractPropTypes, RendererElement } from 'vue'

import IconCheck2Circle from './icons/IconCheck2Circle.vue'
import IconInfoCircle from './icons/IconInfoCircle.vue'
import IconExclamationCircle from './icons/IconExclamationCircle.vue'
import IconXCircle from './icons/IconXCircle.vue'

export const messageTypes = ['success', 'info', 'warn', 'error', 'secondary', 'contrast'] as const
export type messageType = (typeof messageTypes)[number]

export const messageDefaults = {
    message: '',
    type: 'info',
    duration: 3000,
    showClose: true
} as const

export const messageProps = {
    message: {
        type: [String, Object, Function] as PropType<string | VNode | (() => VNode)>,
        default: messageDefaults.message
    },
    type: {
        type: String,
        values: messageTypes,
        default: messageDefaults.type
    },
    duration: {
        type: Number,
        default: messageDefaults.duration
    },
    showClose: {
        type: Boolean,
        default: messageDefaults.showClose
    }
}

export const messageStyles: Record<messageType, { main: string; icon: any }> = {
    success: {
        main: 'bg-green-50 border-green-300 text-green-600',
        icon: IconCheck2Circle
    },
    info: {
        main: 'bg-blue-50 border-blue--300 text-blue-600',
        icon: IconInfoCircle
    },

    warn: {
        main: 'bg-yellow-50 border-yellow-300 text-yellow-600',
        icon: IconExclamationCircle
    },
    error: {
        main: 'bg-red-50 border-red-300 text-red-600',
        icon: IconXCircle
    },
    secondary: {
        main: 'bg-violet-50 border-violet-300 text-violet-600',
        icon: IconCheck2Circle
    },
    contrast: {
        main: 'bg-black border-slate-300 text-slate-200',
        icon: null
    }
}

export const messageContainer = ref<null | RendererElement>(null)

export type MessageProps = ExtractPropTypes<typeof messageProps>
