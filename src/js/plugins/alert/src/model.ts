import type { ExtractPropTypes } from 'vue'

import IconCheck2Circle from './icons/IconCheck2Circle.vue'
import IconInfoCircle from './icons/IconInfoCircle.vue'
import IconExclamationCircle from './icons/IconExclamationCircle.vue'
import IconXCircle from './icons/IconXCircle.vue'

export const alertTypes = ['success', 'info', 'warn', 'error', 'secondary', 'contrast'] as const
export type alertType = (typeof alertTypes)[number]

export const alertDefaults = {
  alert: '',
  type: 'info',
  duration: 500000,
  showClose: true
} as const

export const alertProps = {
  alert: {
    type: [String, Object, Function] as PropType<string | VNode | (() => VNode)>,
    default: alertDefaults.alert
  },
  type: {
    type: String,
    values: alertTypes,
    default: alertDefaults.type
  },
  duration: {
    type: Number,
    default: alertDefaults.duration
  },
  showClose: {
    type: Boolean,
    default: alertDefaults.showClose
  }
}

export const alertStyles: Record<alertType, { main: string; icon: any }> = {
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

export type AlertProps = ExtractPropTypes<typeof alertProps>
