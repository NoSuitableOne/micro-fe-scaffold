import { mount } from './micro-app/lifecycle'

export { bootstrap, mount, unmount } from './micro-app/lifecycle'

if (!window.__MICRO_FE__) {
  mount({ container: document.body, basename: '/react' })
}
