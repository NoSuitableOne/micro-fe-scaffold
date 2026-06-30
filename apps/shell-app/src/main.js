import {
  matchRoute,
  navigate,
  setupLinkInterceptor,
  setupPopStateListener,
  syncNavActive,
} from './router.js'
import { activateRoute } from './loader.js'

/** 标记微前端环境，子应用 main 入口据此跳过 standalone 自挂载 */
window.__MICRO_FE__ = true

async function handleLocation(pathname = location.pathname) {
  const route = matchRoute(pathname)
  syncNavActive(pathname)
  await activateRoute(route)
}

setupLinkInterceptor((path) => navigate(path))
setupPopStateListener(handleLocation)

await handleLocation()
