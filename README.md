# Fenxing Flock — 海外官网

佛山分形科技有限公司（**Foshan Fenxing Technology Co., Ltd.**）海外官网。

B2B 植绒材料供应链服务商，提供 **色浆、绒毛、粘合剂、化工原料、植绒设备** 的一站式采购。品牌名 **Fenxing Flock**。

- **线上地址**：https://fenxingflock.com
- **托管**：GitHub Pages（仓库 `wyz666hhh/fenxingflock`，`master` 分支）
- **域名**：fenxingflock.com（Namesilo / Namecheap，DNS 在注册商处管理）

---

## 技术栈

纯静态站，**无框架、无构建工具、无第三方依赖**。改完文件，浏览器直接打开即可预览。

| 层 | 技术 | 说明 |
|---|---|---|
| 结构 | HTML5 | 语义化标签，页面模板统一 |
| 样式 | 原生 CSS | CSS 变量驱动主题，改色只需改 `:root` |
| 交互 | 原生 JavaScript | ES5 风格，全站共用一个 `main.js` |
| 搜索优化 | JSON-LD | Organization / Article / Product 结构化数据 |

> 这个站刻意保持"零依赖"——不需要 `npm install`、不需要编译。任何能编辑文本的开发者都能直接上手。

---

## 项目结构

```
website/
├── index.html              ← 首页（Hero + 产品概览 + 优势 + CTA）
├── products.html           ← 产品页（绒毛/粘合剂/色浆/化工原料/设备，含色卡画廊）
├── about.html              ← 关于我们（介绍 + 使命愿景 + 制造工序 + 合作流程）
├── resources.html          ← 行业知识 / 文章列表
├── contact.html            ← 联系我们（WhatsApp 直聊 + FAQ）
├── CNAME                   ← 自定义域名，勿删
├── README.md               ← 本文件
├── sitemap.xml             ← 站点地图（13 个 URL：5 页面 + 8 文章）
├── robots.txt              ← 搜索引擎爬虫规则
│
├── css/
│   └── style.css           ← 全局样式（17 段，按主题分区）
│
├── fonts/                  ← 自托管字体（Poppins + Open Sans woff2，国内外都快）
│   ├── poppins-*.woff2
│   └── open-sans-*.woff2
│
├── js/
│   └── main.js             ← 全局交互（5 个功能，见文件头注释）
│
├── images/
│   ├── products/           ← 产品主图（flock-fiber/adhesive/color-paste/equipment）
│   │   ├── 全消光尼龙/      ← Full Dull Nylon 色卡（JBN / MFN 系列）
│   │   ├── 半消光尼龙/      ← Semi Dull Nylon 色卡（TFN 系列）
│   │   ├── 粘胶/            ← Viscose Rayon 纹理效果（15 种）
│   │   └── _originals/     ← 原图备份（已 gitignore，不进仓库）
│   ├── company/            ← 公司照片（about-us / warehouse）
│   └── articles/           ← 文章配图（缩略图）
│
└── articles/               ← GEO 技术文章（每篇含 JSON-LD，共 8 篇）
    ├── what-is-flock-fiber.html
    ├── nylon-vs-rayon-vs-polyester-flock-fiber.html
    ├── how-to-import-flock-fiber-from-china.html
    ├── understanding-flock-fiber-specifications.html
    ├── complete-guide-to-flocking-adhesives.html
    ├── flocking-in-automotive-interiors.html
    ├── flocking-for-home-textiles.html
    └── how-to-start-a-flocking-business.html
```

---

## 设计系统（配色）

所有颜色定义在 `css/style.css` 的 `:root` 里，**改色只改这里，全站自动生效**。

| CSS 变量 | 色值 | 用途 |
|---|---|---|
| `--navy` | `#0f172a` | 主色-专业深蓝（header/footer/标题/按钮） |
| `--navy-light` | `#1e293b` | 深蓝 hover（slate-800） |
| `--steel` | `#334155` | 石板蓝（次要元素、链接） |
| `--steel-light` | `#94a3b8` | 浅石板蓝（小字说明） |
| `--accent` | `#0369a1` | 强调蓝（logo 高亮/CTA） |
| `--gray-dark` | `#020617` | 正文深色 |
| `--gray` | `#64748b` | 正文中灰 |
| `--gray-light` | `#f8fafc` | 背景浅色（卡片/区块底色） |
| `--border` | `#e2e8f0` | 边框色 |
| `--radius` | `6px` | 全局圆角 |

整体风格：**专业深蓝 + 蓝色 CTA**，稳重专业（B2B 外贸）。

---

## 开发约定

### 页面模板

每个页面的骨架完全一致，改一个页面时**保持与其他页面同步**：

1. `<head>`：`<meta charset>` → `viewport` → `description` → `<title>` → 样式表 →（可选）JSON-LD
2. `<header>`：导航栏（5 个链接，Home/Products/About/Resources/Contact）
3. `.page-banner`：页面标题横幅
4. 正文 `<section>`
5. `<footer>`：4 列页脚（品牌/产品/快速链接/联系方式）
6. `<script src="js/main.js">`

> **注意路径**：根目录页面用相对路径 `css/style.css`、`js/main.js`；`articles/` 下的文章页要加 `../` 前缀。

### 加一篇新文章（GEO 内容）

1. 在 `articles/` 下新建 `.html`，复制任意一篇现有文章的骨架（保证 header/footer 一致）
2. 填写 `<head>` 里的 `description`、`<title>`、JSON-LD（`Article` 类型，含 `datePublished`）
3. 正文用 `.article-full` 容器，表格统一用 `.spec-table` 类
4. 在 `resources.html` 的 `.article-list` 里复制一个 `.article-card` 块，改标题/摘要/链接
5. 缩略图放到 `images/articles/`（或继续用 `img-placeholder` 类占位）

### JSON-LD 规范

网站三处结构化数据，AI 搜索引擎（GEO）靠它理解内容：

- **首页** `index.html`：`Organization`（含电话 `contactPoint`）
- **产品页** `products.html`：`ItemList` + 5 个 `Product`
- **文章页** `articles/*.html`：`Article`（含 `headline` / `datePublished`）

---

## 如何修改

| 想改什么 | 改哪里 |
|---|---|
| 文字/文案 | 对应 `.html` 文件 |
| 颜色/主题 | `css/style.css` 的 `:root` 变量 |
| 样式细节 | `css/style.css` 对应分区（文件内有注释索引） |
| 交互行为 | `js/main.js`（文件头有功能清单） |
| 产品图 | `images/products/`（保持文件名不变） |
| 色卡图 | `images/products/全消光尼龙/` 等子目录 |
| 联系方式（电话） | 全站 header/footer/contact 页，全局搜索替换 |

**本地预览**：直接用浏览器打开 `index.html` 即可，无需起服务器。

**发布**：`git add . && git commit -m "..." && git push origin master`，GitHub Pages 会自动重新部署（约 1-2 分钟生效）。

---

## 待办事项

- [ ] 改性涤纶（Modified Polyester）色卡：目前是 6 个占位色块（`products.html` 的 `#swatch-modpoly`），待补实拍图
- [ ] GEO 文章：规划 12 篇，已完成 8 篇，剩余 4 篇（质检 / 色浆 / 环保 / 设备）（节奏：一天两篇）
- [ ] 平台注册：LinkedIn 公司主页、Made-in-China.com 免费版
