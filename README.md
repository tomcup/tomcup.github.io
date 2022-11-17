# Tomcup Blog
个人静态博客  
基于 Vercel Nextjs 的 [Blog Starter using markdown files](https://github.com/vercel/next.js/tree/canary/examples/blog-starter) 实例项目改造  
使用 lib/api.tsx 自动搜索 Markdown 文件，详见文件注释

## 注意：
在同一页面中的 getStaticProps 和 getStaticPaths 函数里，dir 应该相同。
建议在动态页面(文件名形似\[slug\])中的开头部分定义一 dir 常数，以保证该页面所调用的api函数所传入的 dir 值相同

## Road Map
### 基础
- [ ] ~~使用 appDir 构建应用程序~~
- [ ] 使用 Bootstarp 美化界面
- [ ] 使用 fs 自动搜索并构建 文章界面
- [ ] 使用 fs 支持 Feature 页面
- [ ] 使用 Github Action 构建部署，加入更新日期

### 进阶
- [ ] 利用爬虫（github.com/tomcup）构建作者界面
- [ ] 加强文章界面，加入 Code Highlight
- [ ] 使用 Github Action 构建 Privite 仓库（Site）中的源代码提交至 Public 仓库 （tomcup.github.io）
- [ ] 使用 Algolia 进行文章搜索
- [ ] 使用 Supabase 进行网站数据统计

## 高级
- [ ] 使用 Github Action 自动***更新*** Algolia 数据
- [ ] 探索 Github