# micro-fe

微前端集成探索 Monorepo，包含四个异构子应用，用于后续验证微前端框架集成能力。

## 项目结构

```
micro-fe/
├── apps/
│   ├── vue-app/       # Vue 3 + Vite
│   ├── react-app/     # React 19 + Vite
│   ├── angular-app/   # Angular 19
│   └── svelte-app/    # Svelte 5 + Vite
├── packages/
│   └── shared-types/  # 微前端契约类型（MicroAppProps / Lifecycle）
└── docs/              # 探索文档
```

## 环境要求

- Node.js >= 18
- pnpm 9（已通过 corepack 配置）

## 快速开始

```bash
# 安装依赖
pnpm install

# 并行启动全部子应用
pnpm dev

# 或单独启动
pnpm dev:vue      # http://localhost:5173
pnpm dev:react    # http://localhost:5174
pnpm dev:angular  # http://localhost:4200
pnpm dev:svelte   # http://localhost:5175
```

## 构建

```bash
pnpm build          # 构建全部子应用
pnpm build:vue      # 仅构建 Vue
pnpm build:react    # 仅构建 React
pnpm build:angular  # 仅构建 Angular
pnpm build:svelte   # 仅构建 Svelte
```

## 微前端生命周期

每个子应用均实现统一契约（见 `packages/shared-types`）：

| 钩子 | 说明 |
|------|------|
| `bootstrap` | 首次加载初始化 |
| `mount` | 挂载到基座容器 |
| `unmount` | 卸载并清理 |

生命周期实现位于各应用的 `src/micro-app/lifecycle.ts(x)`。

### 独立运行 vs 微前端模式

- **独立运行**（默认）：直接 `pnpm dev`，各应用在本机端口单独访问
- **微前端模式**：基座注入 `window.__MICRO_FE__ = true` 后加载子应用，由基座调用 lifecycle

## 开发端口

| 应用 | 端口 | 建议路由前缀 |
|------|------|-------------|
| Vue | 5173 | `/vue` |
| React | 5174 | `/react` |
| Angular | 4200 | `/angular` |
| Svelte | 5175 | `/svelte` |

Vite 子应用已开启 `cors: true`，便于后续基座跨域加载。

## 下一步

- [ ] 创建主应用（Shell / 基座）
- [ ] 接入 qiankun / micro-app / Module Federation 等方案做 POC
- [ ] 按 [微前端框架路线图与里程碑](./docs/微前端框架路线图与里程碑.md) 推进集成验证
