import type { AlertProps } from './model'
import { alertDefaults } from './model'
import Alert from './VAlert.vue'
import { createApp } from 'vue'

export function VAlert(msgProps: Partial<AlertProps>) {
  const props = {
    alert: msgProps.alert ?? alertDefaults.alert,
    type: msgProps.type ?? alertDefaults.type,
    duration: msgProps.duration ?? alertDefaults.duration,
    showClose: msgProps.showClose ?? alertDefaults.showClose
  }

  let container = document.querySelector('#alert-container') as HTMLElement

  if (!container) {
    container = document.createElement('div')
    container.id = 'alert-container'
    container.style.cssText = `
            position: fixed;
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-top: 2rem;
            top: 2rem;
            right: 2rem;
            z-index: 50;
        `
    document.body.appendChild(container)
  }

  return new Promise<boolean>((resolve) => {
    const app = createApp(Alert, {
      ...props,
      onConfirm: () => {
        resolve(true)
        app.unmount()
      },
      onCancel: () => {
        resolve(false)
        app.unmount()
      }
    })
    const instance = app.mount(container)
    container.appendChild(instance.$el)
  })
}
