import { bootstrapApplication } from '@angular/platform-browser'
import { appConfig } from './app/app.config'
import { AppComponent } from './app/app.component'

export { bootstrap, mount, unmount } from './micro-app/lifecycle'

if (!window.__MICRO_FE__) {
  bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err))
}
