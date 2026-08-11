# Fenxing Flock — 网站项目说明

佛山分形科技有限公司（Foshan Fenxing Technology Co., Ltd.）海外官网。

- **线上地址**：https://fenxingflock.com
- **托管**：GitHub Pages（仓库：wyz666hhh/fenxingflock）
- **域名**：fenxingflock.com（Namesilo）

---

## 📁 项目结构

```
├── index.html              ← 首页
├── products.html           ← 产品页（绒毛/粘合剂/色浆/设备）
├── about.html              ← 关于我们
├── resources.html          ← 行业知识/文章列表
├── contact.html            ← 联系我们 + FAQ
├── CNAME                   ← 自定义域名（勿删）
├── README.md               ← 本文件
│
├── css/
│   └── style.css           ← 全局样式（工业蓝灰配色）
│
├── js/
│   └── main.js             ← 导航菜单/平滑滚动
│
├── images/
│   ├── products/           ← 产品图片（4张）
│   ├── company/            ← 公司图片（2张）
│   └── articles/           ← 文章配图（4张）
│
└── articles/
    └── *.html              ← GEO 技术文章
```

## 🎨 配色方案

| 用途 | 色值 |
|---|---|
| 主色（深蓝） | `#1E3764` |
| 强调色（蓝） | `#346CB0` |
| 背景灰 | `#F1F3F7` |
| 文字灰 | `#6B7A8D` |

## 🔧 如何修改

1. **改文字**：直接用 VS Code 打开对应 `.html` 文件编辑
2. **改样式**：编辑 `css/style.css`
3. **换图片**：替换 `images/` 下对应文件（保持文件名不变）
4. **加文章**：在 `articles/` 下新建 `.html`，然后在 `resources.html` 里添加链接卡片
5. **测试**：直接在浏览器打开 `index.html` 预览
6. **发布**：`git add . && git commit -m "..." && git push origin master`

## 📝 待替换

- `images/` 下目前为占位图，有真实产品照片后直接替换即可（保持文件名不变）
- 联系表单 `contact.html` 中 Formspree ID 需要更换为真实 ID
