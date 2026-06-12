import type { MicroAppProps } from '@micro-fe/shared-types'
import { createApp, type App as VueApp } from 'vue'
import App from '../App.vue'
import '../style.css'

let app: VueApp | null = null

function resolveMountTarget(props: MicroAppProps): HTMLElement | string {
  if (typeof props.container === 'string') {
    return props.container
  }
  return props.container.querySelector('#app') ?? props.container
}

export async function bootstrap() {
  console.log('[vue-app] bootstrap')
}

export async function mount(props: MicroAppProps) {
  console.log('[vue-app] mount', props)
  app = createApp(App)
  app.mount(resolveMountTarget(props))
}

export async function unmount(_props: MicroAppProps) {
  console.log('[vue-app] unmount')
  app?.unmount()
  app = null
}
