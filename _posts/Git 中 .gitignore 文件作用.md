---
excerpt: "在git倉庫中，有一個 .gitignore 文件，這是用來屏蔽某些不需要跟蹤的文件，其中的內容有归递效果，可以在文件（夾）名前加上 / 消除"
coverImage: "/image/defaultcover.jpg"
date: "2022-11-22T08:04:00.007+08:00"
ogImage:
  url: "/image/defaultcover.jpg"
  desc: "法第三季度手机关机估计到家"
---

<!-- 目录标题请假装看不见，用于内部自动生成目录时锚点使用 -->

## 目录

---

.gitignore 文件用于在将文件提交到 git 暂存区时，指定将哪些文件排除；

## .gitignore 文件基本用法

```typescript
# 忽略.class后缀的所有文件
*.class

# 忽略名称中末尾为ignore的文件夹
*ignore/

# 忽略名称中间包含ignore的文件夹
*ignore*/
```

## .gitignore 文件不生效的解决办法

对于已经进行过 git add 操作的目录，如果新添加了. gitignore 文件，则在进行 git commit 时，.gitignore 文件不不会生效的；  
解决办法如下：

```bash
git rm --cache <filename>
# or folder
git rm --cache -r <foldername>
```
