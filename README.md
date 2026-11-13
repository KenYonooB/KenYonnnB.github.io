# AI Infra 学习档案

记录系统编程、并行计算和 AI 基础设施的学习路线、技术笔记与实验。首页是独立的静态 HTML，其他页面使用 Jekyll 和 Hydejack 构建。

## 页面

| 页面 | 路径 | 内容 |
| --- | --- | --- |
| 首页 | `/` | 学习方向、近期更新与主要入口 |
| Now | `/#/now` | 当前关注的问题与学习进度 |
| Roadmap | `/#/roadmap` | 六阶段学习路线与验证目标 |
| Notes | `/#/notes` | 按主题组织的笔记档案 |
| Labs | `/#/labs` | 实验记录、选题与复现要求 |
| 技术概览 | `/resume/` | 技术主题与实践方向 |
| 关于本站 | `/about/` | 站点用途与内容编写原则 |

首页提供站内搜索。页脚的「查看示例」可打开演示内容，示例页会明确标注实验数据和进度的用途。

## 本地预览

安装 Ruby 和 Bundler 后，在仓库根目录运行：

```sh
bundle install
bundle exec jekyll serve
```

打开 [http://localhost:4000](http://localhost:4000) 查看站点。运行 `bundle exec jekyll build` 可生成 `_site/`，其中包括首页、技术概览和关于页。

## 更新内容

- [index.html](index.html) 包含首页、学习路线、笔记和实验的数据与页面样式。
- [resume.md](resume.md) 和 [about.md](about.md) 分别维护技术概览与站点介绍。
- [_config.yml](_config.yml) 和 [_sass/my-style.scss](_sass/my-style.scss) 用于调整站点导航和主题外观。

公开内容聚焦技术主题、复现步骤与验证结果。发布前请检查正文、截图和日志中的身份信息与内部环境标识。

## Cloudflare Workers

将生产分支设为 `main`，根目录设为 `/`。构建命令使用 `JEKYLL_ENV=production bundle exec jekyll build`，部署命令使用 `npx wrangler deploy`。`wrangler.toml` 将生成的 `_site/` 发布为静态资源。[Cloudflare Workers 静态资源文档](https://developers.cloudflare.com/workers/static-assets/)

## 主题许可

[Hydejack](https://hydejack.com/) 免费版使用 [GPL-3.0](https://github.com/hydecorp/hydejack/blob/master/LICENSE.md)。
