# LiteKit · 个人数字实验室与效率作品集

捕捉日常学习与办公中的真实小痛点，用 AI 与原生 Web 技术构建**免登录、点开即用、纯本地隐私安全**的极简效率工具集。

## 站点导航与在线作品

| 模块 | 路径 | 说明 |
| --- | --- | --- |
| 首页 | `/#/` | 品牌定位、核心指标、二进制深海画布与四款效率工具总览 |
| 作品集 | `/#/works` | LiteKit 效率四件套矩阵与交互入口（兼容旧路径 `/#/labs`） |
| CleanPaste | `/#/tool/cleanpaste` | AI 回复与 PDF 复制文本一键净化、断行修复与中英盘古排版台 |
| SnapCard | `/#/tool/snapcard` | 支持 `==荧光笔高亮==`、6 款主题与多画幅比例的高清卡片生成器 |
| SafePic | `/#/tool/safepic` | 100% 浏览器离线证件防盗水印与目标 KB 二分法精准压缩箱 |
| FlowZone | `/#/tool/flowzone` | Web Audio 四轨白噪音实时合成、全屏二进制深海沉浸模式与心流小票 |
| 产品复盘 | `/#/notes` | 每款工具背后的痛点拆解、MVP 功能取舍与细节打磨记录 |
| 演进路线 | `/#/roadmap` | 从痛点捕捉、视觉统一到纯本地工程落地的四阶段方法论 |
| 能力概览 | `/resume/` | 产品思维、交互设计与 Web 原生实践概览（Jekyll 页面） |
| 关于本站 | `/about/` | 站点造物原则与隐私说明（Jekyll 页面） |

## 视觉与架构特色

- **暗黑毛玻璃设计系统**：基于 `assets/css/site-glass.css` 与统一色彩令牌构建，兼顾高对比可读性与通透层次感。
- **二进制深海动态背景**：`assets/js/binary-ocean.js` 使用 Canvas 绘制灰蓝色 `0`/`1` 游鱼，支持随时暂停与 `prefers-reduced-motion` 无障碍降级，并与 `FlowZone` 深海沉浸模式深度联动。
- **零后端纯本地运行**：全部工具基于原生浏览器能力（Canvas 2D、Blob、Clipboard API、Web Audio API、LocalStorage）实现，0 字节数据上传，静态托管永久稳定可用。

## 本地预览与构建

纯静态预览主站作品集（无需安装额外依赖）：

```sh
npx serve .
# 或 python -m http.server 8080
```

如需完整构建包含 `/resume/` 与 `/about/` 的 Jekyll 站点：

```sh
bundle install
bundle exec jekyll serve
```

## 许可说明

子页主题基于 [Hydejack](https://hydejack.com/)（[GPL-3.0](https://github.com/hydecorp/hydejack/blob/master/LICENSE.md)）。
