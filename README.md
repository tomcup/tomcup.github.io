# Tomcup Blog 简介

***注意：以下內容正在遷移至 文章專題***  
***詳見 [文章專題](https://tomcup.github.io/features/document/Home)***

个人静态博客  
参考自 Vercel Nextjs 的 [Blog Starter using markdown files](https://github.com/vercel/next.js/tree/canary/examples/blog-starter) 实例项目改造  
使用 lib/api.tsx 自动搜索 Markdown 文件，详见文件注释

## 须知

在同一页面中的 getStaticProps 和 getStaticPaths 函数里，dir 应该相同。
建议在动态页面(文件名形似\[slug\])中的开头部分定义一 dir 常数，以保证该页面所调用的 api 函数所传入的 dir 值相同

## Markdown 文章信息

请将文章信息填写在 Markdown 文件的头部，这是默认信息（格式）：

```
---
<!-- 文件头部 -->
title: "title"  // 未填写时默认为 文件名称
excerpt: ""
coverImage: "/image/defaultcover.jpg"
date: "2022-01-01T00:00:00.000Z“
author:
    name: "Tomcup"
    url: "github.com/tomcup"
ogImage:
    url: "/image/defaultcover.jpg"
    desc: ""
---
```

另外，在文件内容中若有：

```
## 目录
```

那么在该标题下将自动生成目录。比如要在所有内容前插入目录，则将这个标题紧接着写在文件信息后即可。  
注意：尚未测试在该目录中写入内容会发生什么，但是不建议这样做

## 普通文章

文件位置：`/_posts/[文章名].md`

## 专题文章

文件位置：`/_posts/features/[专题名]/[文章名].md`  
页面位置：`/features/[专题名]/[文章名]`
