---
title: "技術文檔 - 總體介紹"
excerpt: "这里只是分析代码里的运行技术，并不介绍怎么用它们。\n如果要使用的这些脚本，请參閱 使用文檔 或 文件注釋。"
---
# api.tsx
这个文件是在模板项目中继承而来的。经过几次大型的改动后，可能其中的函数名已经不太契合其中的内容。由于这些名字已经大量使用看习惯了，不想改。  
## 1. getPostSlugs - 函數
代码很好理解。

```typescript
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

```typescript
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

## 2. getPostBySlug

根据文章名获取文章信息
