const containerSelector = '#micro-app-container'
const statusSelector = '#micro-app-status'
const homeSelector = '#shell-home'

/** @type {{ mod: import('@micro-fe/shared-types').MicroAppLifecycle | null, name: string | null }} */
let active = { mod: null, name: null }

function getContainer() {
  const el = document.querySelector(containerSelector)
  if (!el) throw new Error(`Container not found: ${containerSelector}`)
  return el
}

function getStatusEl() {
  return document.querySelector(statusSelector)
}

function showHome(show) {
  const home = document.querySelector(homeSelector)
  if (home) home.hidden = !show
}

function setStatus(message, type = 'info') {
  const el = getStatusEl()
  if (!el) return

  if (!message) {
    el.hidden = true
    el.textContent = ''
    el.dataset.type = ''
    return
  }

  el.hidden = false
  el.textContent = message
  el.dataset.type = type
}

/**
 * @param {import('@micro-fe/shared-types').MicroAppProps} props
 */
function buildProps(basename) {
  return {
    container: getContainer(),
    basename,
    globalState: {},
    setGlobalState(state) {
      Object.assign(this.globalState, state)
    },
    onGlobalStateChange(callback, fireImmediately) {
      if (fireImmediately) callback(this.globalState, {})
    },
  }
}

export async function unloadActiveApp() {
  if (!active.mod) return

  const props = buildProps('/')
  try {
    await active.mod.unmount(props)
  } catch (error) {
    console.error(`[shell] unmount ${active.name} failed`, error)
  }

  getContainer().innerHTML = ''
  active = { mod: null, name: null }
}

/** @type {Record<string, string> | null} */
let importMapImports = null

async function getMicroAppUrl(specifier) {
  if (!importMapImports) {
    const res = await fetch('/importmap.json')
    if (!res.ok) throw new Error('无法加载 /importmap.json')
    const data = await res.json()
    importMapImports = data.imports ?? {}
  }

  const url = importMapImports[specifier]
  if (!url) throw new Error(`importmap.json 中未找到：${specifier}`)
  return url
}

/** @type {Promise<void> | null} */
let reactPreamblePromise = null

/**
 * React 子应用经 Shell 跨域加载时不会经过 react-app 的 index.html，
 * 需在执行 JSX 模块前手动注入 @vitejs/plugin-react 的 Fast Refresh preamble。
 * @see https://vite.dev/guide/backend-integration.html
 * @param {string} entryUrl importmap 中 react 子应用入口 URL
 */
async function ensureReactPreamble(entryUrl) {
  if (window.__vite_plugin_react_preamble_installed__) return

  if (!reactPreamblePromise) {
    reactPreamblePromise = (async () => {
      const origin = new URL(entryUrl).origin
      const refreshUrl = `${origin}/@react-refresh`
      const mod = await import(/* @vite-ignore */ refreshUrl)
      const RefreshRuntime = mod.default ?? mod
      RefreshRuntime.injectIntoGlobalHook(window)
      window.$RefreshReg$ = () => {}
      window.$RefreshSig$ = () => (type) => type
      window.__vite_plugin_react_preamble_installed__ = true
    })()
  }

  await reactPreamblePromise
}

/**
 * 运行时读取 importmap.json 取得完整 URL 再 import。
 * - 避免 Vite 静态分析 bare specifier（@micro-fe/*）
 * - 完整 URL 的 import(url) 不依赖浏览器 Import Map 解析
 * @param {string} specifier
 */
async function importMicroApp(specifier) {
  const url = await getMicroAppUrl(specifier)

  if (specifier === '@micro-fe/react-app') {
    await ensureReactPreamble(url)
  }

  // Angular：ng serve 只提供编译产物（polyfills.js + main.js），不提供 /src/*.ts
  if (specifier === '@micro-fe/angular-app') {
    const origin = new URL(url).origin
    await import(/* @vite-ignore */ `${origin}/polyfills.js`)
    return import(/* @vite-ignore */ url)
  }

  return import(/* @vite-ignore */ url)
}

/**
 * @param {{ name: string, specifier: string, basename: string }} route
 */
export async function loadApp(route) {
  await unloadActiveApp()
  showHome(false)
  setStatus(`正在加载 ${route.name} 子应用…`, 'loading')

  try {
    const mod = await importMicroApp(route.specifier)

    if (typeof mod.mount !== 'function' || typeof mod.unmount !== 'function') {
      throw new Error(`模块 ${route.specifier} 未导出 mount / unmount`)
    }

    const props = buildProps(route.basename)

    if (typeof mod.bootstrap === 'function') {
      await mod.bootstrap(props)
    }

    await mod.mount(props)

    active = { mod, name: route.name }
    setStatus('')
  } catch (error) {
    console.error(`[shell] load ${route.name} failed`, error)
    showHome(false)
    getContainer().innerHTML = ''
    setStatus(
      `加载 ${route.name} 失败：${error.message}。请确认对应子应用 dev server 已启动（见 importmap.json）。`,
      'error',
    )
  }
}

export async function activateRoute(route) {
  if (!route.specifier) {
    await unloadActiveApp()
    showHome(true)
    setStatus('')
    getContainer().innerHTML = ''
    return
  }

  await loadApp(route)
}
