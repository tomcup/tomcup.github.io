# 已知問題
1. 問題：当存在`/_posts/features/[专题名]/`中不含 Markdown 文件时，专题页面中的 getStaticPaths 可能出现

# 近期計劃
1. 思考：`/lib/api.tsx` 中 getPostBySlug 函数中`if (typeof data[field] !== "undefined") { items[field] = data[field]; }`为什么这样写，這段代碼继承自源示例项目
2. 思考：`/pages/feature/[...slug].tsx`中 `getStaticPaths` 返回值 result 为何是 2层 嵌套列表，详见注释。
3. 文檔：繼續編寫技術文檔

# Rode Map
## 基础
- [ ] ~~xx使用 appDir 构建应用程序 放弃：appDir 是服务器友好的 Beta 版本，不适合静态博客且功能、文档不完整~~
- [ ] 使用 Bootstarp 美化界面
- [x] 使用 fs 自动搜索并构建 文章界面
- [x] 使用 fs 支持 Feature 页面
- [ ] 在 Github Wiki 中編寫 技術文檔 - 正在建設
- [ ] 使用 Github Action 构建部署，加入**更新日期**

## 进阶
- [ ] 利用爬虫（github.com/tomcup）构建作者界面
- [ ] 提高 API 速度
- [ ] 在網站中加入 RSS 訂閱功能 - 使用 [node-xml2js](https://github.com/Leonidas-from-XIV/node-xml2js)
- [ ] 支持 繁/簡 字體切換
- [ ] 加强文章界面，加入 Code Highlight
- [ ] 使用 Github Action 构建 Privite 仓库（Site）中的源代码提交至 Public 仓库 （tomcup.github.io）
- [ ] 使用 Algolia 进行文章搜索
- [ ] 使用 Supabase 进行网站数据统计

## 高级
- [ ] 使用 Github Action 自动**_更新_** Algolia 数据
- [ ] 支持 亮/暗 模式切換
- [ ] 探索 Github