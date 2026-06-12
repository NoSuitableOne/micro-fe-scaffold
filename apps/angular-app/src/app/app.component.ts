import { Component, signal } from '@angular/core'

@Component({
  selector: 'app-root',
  imports: [],
  template: `
    <div class="micro-app micro-app--angular">
      <span class="micro-app__badge">Angular 19</span>
      <h1>Angular 子应用</h1>
      <p>可独立运行，也可通过 bootstrap / mount / unmount 接入微前端基座。</p>
      <button type="button" (click)="increment()">Count: {{ count() }}</button>
    </div>
  `,
  styles: [
    `
      .micro-app {
        max-width: 640px;
        margin: 2rem auto;
        padding: 2rem;
        border-radius: 12px;
        border: 1px solid #e2e8f0;
        background: #fff;
        font-family: system-ui, -apple-system, sans-serif;
        line-height: 1.5;
        color: #213547;
      }

      .micro-app--angular {
        border-top: 4px solid #dd0031;
      }

      .micro-app__badge {
        display: inline-block;
        padding: 0.25rem 0.75rem;
        border-radius: 999px;
        background: #dd0031;
        color: #fff;
        font-size: 0.875rem;
        font-weight: 600;
      }

      h1 {
        margin: 1rem 0 0.5rem;
      }

      p {
        color: #64748b;
      }

      button {
        margin-top: 1rem;
        padding: 0.5rem 1rem;
        border: none;
        border-radius: 8px;
        background: #dd0031;
        color: #fff;
        font-size: 1rem;
        cursor: pointer;
      }

      button:hover {
        background: #c4002b;
      }
    `,
  ],
})
export class AppComponent {
  readonly count = signal(0)

  increment() {
    this.count.update((value) => value + 1)
  }
}
