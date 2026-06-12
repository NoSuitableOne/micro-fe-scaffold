/** 微前端子应用 mount 时由基座传入的 props */
export interface MicroAppProps {
  /** 挂载容器：DOM 节点或选择器 */
  container: HTMLElement | string
  /** 子应用路由 base，如 /vue */
  basename?: string
  /** 基座下发的全局状态 */
  globalState?: Record<string, unknown>
  /** 更新全局状态 */
  setGlobalState?: (state: Record<string, unknown>) => void
  /** 订阅全局状态变化 */
  onGlobalStateChange?: (
    callback: (state: Record<string, unknown>, prev: Record<string, unknown>) => void,
    fireImmediately?: boolean,
  ) => void
}

export interface MicroAppLifecycle {
  bootstrap?: (props: MicroAppProps) => Promise<void>
  mount: (props: MicroAppProps) => Promise<void>
  unmount: (props: MicroAppProps) => Promise<void>
  update?: (props: MicroAppProps) => Promise<void>
}

declare global {
  interface Window {
    /** 由基座注入，标记当前运行在微前端环境 */
    __MICRO_FE__?: boolean
  }
}

export {}
