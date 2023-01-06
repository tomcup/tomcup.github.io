---
title: "如何在 Next.js 中正确地使用 Bootstrap?"
---

## 目录

# 问题

安装 bootstrap 后，npm install bootstrap 添加了样式，/pages/\_app.js 写入如下内容：

```typescript
import "bootstrap";
```

运行时（渲染时而非编译时）报错：

```
ReferenceError: document is not defined
```

# 分析

Bootstrap 的 JavaScript 文件中需要 document 的函数在编译时——渲染前——就被定义了，但是 Nextjs 自身在编译时不会调用这些函数，所以编译不会报错。

但是一旦要在浏览器中浏览（渲染）组件，出于某种原因，boostrap 的函数在 document 就被调用了，于是报错。

解决思路很简单，就是在渲染之后再加载 Bootstrap 的脚本即可。

# 解决办法

在 /pages/\_app.js 中的主函数内添加：

```typescript
useEffect(() => {
  require("bootstrap/dist/js/bootstrap");
}, []);
```

可别忘了在开头引入 useEffect: `import { useEffect } from "react";`
