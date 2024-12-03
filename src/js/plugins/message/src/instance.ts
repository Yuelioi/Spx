import type { MessageProps } from './model'
import { messageDefaults } from './model'
import { createVNode, render } from 'vue'
import VMessage from './VMessage.vue'

import { messageContainer } from './model'

export function Message(msgProps: Partial<MessageProps>) {
    const props = {
        message: msgProps.message ?? messageDefaults.message,
        type: msgProps.type ?? messageDefaults.type,
        duration: msgProps.duration ?? messageDefaults.duration,
        showClose: msgProps.showClose ?? messageDefaults.showClose
    }

    let container = document.querySelector('#message-container') as HTMLElement

    if (!container) {
        container = document.createElement('div')
        container.id = 'message-container'
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

    messageContainer.value = container

    if (messageContainer.value) {
        const child = document.createElement('div')
        const VNode = createVNode(VMessage, props)
        render(VNode, child)
        messageContainer.value.appendChild(child)
    } else {
        console.error('Message container is not registered.')
    }
}
