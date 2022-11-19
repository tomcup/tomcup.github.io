# Tomcup Blog 简介

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

# TODO

1. 問題：当存在`/_posts/features/[专题名]/`中不含 Markdown 文件时，专题页面中的 getStaticPaths 可能出现
2. 思考：`/lib/api.tsx` 中 getPostBySlug 函数中`if (typeof data[field] !== "undefined") { items[field] = data[field]; }`为什么这样写，继承自源示例项目
3. 思考：`/pages/feature/[...slug].tsx`中 `getStaticPaths` 返回值 result 为何是 2层 嵌套列表，详见注释。
4. 文檔：繼續編寫技術文檔

# Road Map

### 基础

- [ ] ~~使用 appDir 构建应用程序 放弃：appDir 是服务器友好的 Beta 版本，不适合静态博客且功能、文档不完整~~
- [ ] 使用 Bootstarp 美化界面
- [x] 使用 fs 自动搜索并构建 文章界面
- [x] 使用 fs 支持 Feature 页面
- [ ] 在 Github Wiki 中編寫 技術文檔
- [ ] 使用 Github Action 构建部署，加入更新日期

### 进阶

- [ ] 利用爬虫（github.com/tomcup）构建作者界面
- [ ] 支持 繁/簡 字體切換
- [ ] 加强文章界面，加入 Code Highlight
- [ ] 使用 Github Action 构建 Privite 仓库（Site）中的源代码提交至 Public 仓库 （tomcup.github.io）
- [ ] 使用 Algolia 进行文章搜索
- [ ] 使用 Supabase 进行网站数据统计

## 高级

- [ ] 使用 Github Action 自动**_更新_** Algolia 数据
- [ ] 支持 亮/暗 模式切換
- [ ] 探索 Github

# 技术文档 - 將要遷至 Github Wiki

使用 Visual Studio Code 软件编写  
使用 Prettier - Code formatter 插件格式化脚本

使用 TypeScript 为脚本格式并开启严格模式，这能使得所写代码更加完整、规范  
以 /lib/api.tsx 为运转核心，利用 Nodejs 提供的 fs 搜索文件夹内的子文件夹和读取

这里只是分析代码里的运行技术，并不介绍怎么用它们。  
如果要使用的这些脚本，请看它们对应文件里的注释。

## API 介绍 - /lib/\*

这个文件是在模板项目中继承而来的。经过几次大型的改动后，可能其中的函数名已经不太契合其中的内容。由于这些名字已经大量使用看习惯了，不想改。  
原本

### 1. getPostSlugs

代码很好理解。

```
export function getPostSlugs(dir: string, realSlug: boolean = false) {
  let result: string[] = [];
  if (realSlug) {
    fs.readdirSync(join(process.cwd(), dir), {
      encoding: "utf-8",
      withFileTypes: true,
    }).forEach((vaule: fs.Dirent) => {
      if (vaule.isFile() && /\.md$/.test(vaule.name))
        result.push(vaule.name.replace(/\.md$/, ""));
    });
  } else {
    fs.readdirSync(join(process.cwd(), dir), {
      encoding: "utf-8",
      withFileTypes: true,
    }).forEach((vaule: fs.Dirent) => {
      if (vaule.isFile() && /\.md$/.test(vaule.name)) result.push(vaule.name);
    });
  }

  return result;
}
```

至于为何要为了设定是否去除后缀而重复这许多代码，这是因为如果减少重复后代码变成这样（之前版本的源代码）：

```
fs.readdirSync(join(process.cwd(), dir), {
    encoding: "utf-8",
    withFileTypes: true,
}).forEach((vaule: fs.Dirent) => {
    if (vaule.isFile() && /\.md$/.test(vaule.name))
        if (realSlug)   result.push(vaule.name.replace(/\.md$/, ""));
        else    result.push(vaule.name);
});
```

显然要在每次检索 Markdown 文件时都要进行一次额外的判断，明显效率低下，不如多重复一点代码

### 2. getPostBySlug

根据文章名获取文章信息
