import type { MicroAppProps } from '@micro-fe/shared-types'
import { mount as svelteMount, unmount as svelteUnmount } from 'svelte'
import App from '../App.svelte'
import '../app.css'

let app: ReturnType<typeof svelteMount> | null = null

function resolveMountTarget(props: MicroAppProps): HTMLElement {
  if (typeof props.container === 'string') {
    const el = document.querySelector(props.container)
    if (!el) throw new Error(`Container not found: ${props.container}`)
    return el as HTMLElement
  }
  return (props.container.querySelector('#app') as HTMLElement) ?? props.container
}

export async function bootstrap() {
  console.log('[svelte-app] bootstrap')
}

export async function mount(props: MicroAppProps) {
  console.log('[svelte-app] mount', props)
  app = svelteMount(App, { target: resolveMountTarget(props) })
}

export async function unmount(_props: MicroAppProps) {
  console.log('[svelte-app] unmount')
  if (app) {
    svelteUnmount(app)
    app = null
  }
}
