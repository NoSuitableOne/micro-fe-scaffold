/** 路由前缀 → import map 中的模块别名 */
export const routes = [
  { path: '/', name: 'home', specifier: null },
  { path: '/vue', name: 'vue', specifier: '@micro-fe/vue-app', basename: '/vue' },
  { path: '/react', name: 'react', specifier: '@micro-fe/react-app', basename: '/react' },
  { path: '/svelte', name: 'svelte', specifier: '@micro-fe/svelte-app', basename: '/svelte' },
  {
    path: '/angular',
    name: 'angular',
    specifier: '@micro-fe/angular-app',
    basename: '/angular',
  },
]

export function matchRoute(pathname) {
  const normalized = normalizePath(pathname)
  return routes.find((route) => route.path === normalized) ?? routes[0]
}

export function normalizePath(pathname) {
  if (!pathname || pathname === '') return '/'
  const trimmed = pathname.endsWith('/') && pathname.length > 1 ? pathname.slice(0, -1) : pathname
  return trimmed
}

export function navigate(path, { replace = false } = {}) {
  const target = normalizePath(path)
  if (replace) {
    history.replaceState({ path: target }, '', target)
  } else {
    history.pushState({ path: target }, '', target)
  }
  window.dispatchEvent(new PopStateEvent('popstate'))
}

export function setupLinkInterceptor(onNavigate) {
  document.addEventListener('click', (event) => {
    const anchor = event.target.closest('a[data-link]')
    if (!anchor || anchor.target === '_blank') return

    const href = anchor.getAttribute('href')
    if (!href || href.startsWith('http')) return

    event.preventDefault()
    onNavigate(href)
  })
}

export function setupPopStateListener(onNavigate) {
  window.addEventListener('popstate', () => {
    onNavigate(location.pathname)
  })
}

export function syncNavActive(pathname) {
  const current = normalizePath(pathname)
  document.querySelectorAll('.shell-nav a[data-link]').forEach((anchor) => {
    const href = anchor.getAttribute('href')
    anchor.classList.toggle('is-active', normalizePath(href) === current)
  })
}
