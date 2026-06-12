import type { MicroAppProps } from '@micro-fe/shared-types'
import { StrictMode } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import App from '../App'
import '../App.css'

let root: Root | null = null

function resolveMountTarget(props: MicroAppProps): HTMLElement {
  if (typeof props.container === 'string') {
    const el = document.querySelector(props.container)
    if (!el) throw new Error(`Container not found: ${props.container}`)
    return el as HTMLElement
  }
  return (props.container.querySelector('#root') as HTMLElement) ?? props.container
}

export async function bootstrap() {
  console.log('[react-app] bootstrap')
}

export async function mount(props: MicroAppProps) {
  console.log('[react-app] mount', props)
  const container = resolveMountTarget(props)
  root = createRoot(container)
  root.render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}

export async function unmount(_props: MicroAppProps) {
  console.log('[react-app] unmount')
  root?.unmount()
  root = null
}
