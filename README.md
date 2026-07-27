# William Personal Website

William Lao 的公开个人作品网站，聚焦 AI 影像、电影制作、摄影与视觉叙事。

## 当前状态

- 生产版本号：以根目录 `00_Documentation/08_Current_Status.md` 为准
- 公开地址：<https://william-creative-portfolio.jsdntpzv6n.chatgpt.site>
- 访问策略：`public`，访客无需登录
- 当前分支：`main`
- Sites 项目必须复用 `.openai/hosting.json` 中的原 `project_id`

完整交接状态以根目录下列文件为准：

1. `00_Documentation/08_Current_Status.md`
2. `00_Documentation/09_Iteration_Backlog.md`
3. `00_Documentation/10_Next_Chat_Start_Prompt.md`

## 网站结构

- `/`：Home，含满屏 Hero、精选作品、创作能力、关于与联系
- `/works`：全部作品
- `/works/[slug]`：8 个项目详情页
- `/what-i-do`：创作能力总览
- `/what-i-do/[slug]`：4 个创作能力详情页

主要实现位置：

- `app/`：路由、页面与全局样式
- `components/`：Hero、作品卡、Gallery、成片入口等组件
- `lib/`：项目与能力数据
- `content/projects/`：网站使用的项目 Markdown 副本
- `public/assets/`：网页发布素材
- `tests/`：页面结构与公开内容测试

## 内容与素材来源

- 根目录 `01_Content/Projects/` 是人工维护的项目内容源。
- `content/projects/` 是网站构建使用的同步副本。
- 两边修改后必须保持完全一致；运行 `npm run check:content` 检查。
- 根目录 `02_Assets/` 保存原始素材；`public/assets/` 保存网站实际发布版本。
- Showreel 未完成前不得上线空播放器或临时占位。

## 本地验证

需要 Node.js `>=22.13.0`。

```bash
npm install
npm run check:content
npm run lint
npx tsc --noEmit
npm test
```

`npm test` 包含生产 build。需要视觉验收时，使用：

```bash
npm start
```

每次开发必须同时检查桌面端和移动端，并更新 Current Status 与 Backlog。

## 发布规则

- 不重新创建 Sites 项目。
- 不更换现有公开网址和 `public` 策略。
- 只发布已经验证并提交的代码。
- 发布后确认生产部署成功，并检查线上关键页面。
- 短期发布凭证不得写入文件、Git remote 或文档。

## GitHub + Cloudflare Workers

GitHub 仓库必须以当前 `03_Code/code` 目录作为仓库根目录，不能把包含
`00_Documentation`、`02_Assets` 和嵌套 `.git` 的外层资料目录直接提交。

Cloudflare 应使用 **Workers Builds / Import a repository**，不要使用
Cloudflare Pages 的 `React (Vite)` 静态站预设。

推荐构建设置：

```text
Production branch: main
Root directory: /
Build command: npm run build
Deploy command: npm run deploy:cloudflare
Non-production deploy command: npm run upload:cloudflare
```

`npm run build` 会生成 `dist/server/wrangler.json` 和 `dist/client`；
部署命令使用这份生成配置发布 Worker、静态资源和 Images 绑定。

## 不得破坏

- Home / Works / Project Detail / What I Do 的现有路由与内容层级。
- 满屏 16:9 Hero、人物整体移动、投影呼吸和克制的交互幅度。
- Home 六个精选项目、桌面两列、移动端单列和单行标题。
- 纯白浅色页面与深色项目模块。
- 精选 9 张静帧、九宫格下方全量静帧入口、Lightbox 和公开成片入口。
- 中文优先 UI、HBN 非官方委托说明及已经确认的项目职责边界。
