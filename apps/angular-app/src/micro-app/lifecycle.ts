import { ApplicationRef, createComponent } from '@angular/core'
import { createApplication } from '@angular/platform-browser'
import type { MicroAppProps } from '@micro-fe/shared-types'
import { AppComponent } from '../app/app.component'
import { appConfig } from '../app/app.config'

let appRef: ApplicationRef | null = null
let hostElement: HTMLElement | null = null

function resolveContainer(props: MicroAppProps): HTMLElement {
  if (typeof props.container === 'string') {
    const el = document.querySelector(props.container)
    if (!el) throw new Error(`Container not found: ${props.container}`)
    return el as HTMLElement
  }
  return props.container
}

export async function bootstrap() {
  console.log('[angular-app] bootstrap')
}

export async function mount(props: MicroAppProps) {
  console.log('[angular-app] mount', props)
  const container = resolveContainer(props)
  hostElement = document.createElement('app-root')
  container.appendChild(hostElement)

  const app = await createApplication(appConfig)
  appRef = app
  const componentRef = createComponent(AppComponent, {
    environmentInjector: app.injector,
    hostElement,
  })
  app.attachView(componentRef.hostView)
}

export async function unmount(_props: MicroAppProps) {
  console.log('[angular-app] unmount')
  appRef?.destroy()
  appRef = null
  hostElement?.remove()
  hostElement = null
}
