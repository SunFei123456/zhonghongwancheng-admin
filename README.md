# 中鸿万城管理后台

基于 React 19 + TypeScript + Tailwind CSS 构建的现代化管理后台系统。

## 技术栈

- **前端框架**: React 19
- **开发语言**: TypeScript
- **样式框架**: Tailwind CSS 4.0
- **路由管理**: React Router 7
- **构建工具**: Vite 6
- **图表库**: ApexCharts
- **其他**: FullCalendar、React DnD 等

## 项目结构

```
zhonghongwancheng-admin/
├── src/
│   ├── components/     # 组件目录
│   │   ├── auth/      # 认证相关组件
│   │   ├── charts/    # 图表组件
│   │   ├── form/      # 表单组件
│   │   ├── ui/        # UI 基础组件
│   │   └── ...
│   ├── pages/         # 页面组件
│   ├── layout/        # 布局组件
│   ├── context/       # Context API
│   ├── hooks/         # 自定义 Hooks
│   ├── icons/         # 图标文件
│   └── ...
├── public/            # 静态资源
├── docs/              # 文档目录
├── package.json       # 项目配置
└── ...
```

## 快速开始

### 前置要求

- Node.js 18.x 或更高版本（建议使用 Node.js 20.x 或更高版本）
- npm、yarn 或 pnpm

### 安装依赖

```bash
npm install
# 或
yarn install
# 或
pnpm install
```

> 如果在安装时遇到问题，请使用 `--legacy-peer-deps` 标志。

### 启动开发服务器

```bash
npm run dev
# 或
yarn dev
# 或
pnpm dev
```

开发服务器通常会在 `http://localhost:5173` 启动。

### 构建生产版本

```bash
npm run build
# 或
yarn build
# 或
pnpm build
```

### 预览生产构建

```bash
npm run preview
# 或
yarn preview
# 或
pnpm preview
```

## 功能特性

- ✅ 现代化 UI 设计
- ✅ 响应式布局
- ✅ 暗色模式支持
- ✅ 丰富的组件库
- ✅ 数据可视化（图表）
- ✅ 日历功能
- ✅ 表单组件
- ✅ 表格管理
- ✅ 用户认证
- ✅ 路由管理

## 开发规范

- 代码检查: `npm run lint`
- TypeScript 类型检查: `npm run build`（会在构建时进行类型检查）

## 许可证

本项目基于 [MIT 许可证](LICENSE.md) 发布。

## 致谢

本项目基于 [TailAdmin React](https://tailadmin.com) 模板开发。

---

## 文档

更多详细信息请查看 [docs](./docs/) 目录：
- [二次开发流程指南](./docs/二次开发流程指南.md)
- [依赖分析](./docs/依赖分析.md)
