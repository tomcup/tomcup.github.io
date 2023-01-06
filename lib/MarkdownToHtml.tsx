import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkToc from "remark-toc";
import remarkParse from "remark-parse";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeStringify from "rehype-stringify";
import rehypeHighlight from "rehype-highlight";
import rehypeDocument from "rehype-document";

import powershell from "highlight.js/lib/languages/powershell";
import typescript from "highlight.js/lib/languages/typescript";
// rehypeDocument 不需要的，将一个 HTML 片段变为整个 HTML 页面
// rehypeFormat 不需要的，将不规范的HTML代码格式化

import { log } from "./debug";

export async function markdownToHtml(markdown: string) {
  const result = await remark()
    .data("settings", { fragment: true })
    // Remark 部分，该部分是安全的
    .use(remarkParse)
    .use(remarkGfm) // 加强 Remark
    .use(remarkToc, { heading: "目录" })
    // Rehype 部分，以下部分是不安全的
    .use(remarkRehype, { allowDangerousHtml: true }) // 允许在 Markdown 中使用 Html
    .use(rehypeSlug) // 在各级标题上添加 id 属性
    .use(rehypeAutolinkHeadings) // 在各级标题上添加链接锚点
    .use(remarkMath) // 支持数学公式
    .use(rehypeKatex) // 用HTML呈现数学公式
    .use(rehypeHighlight, {
      ignoreMissing: true,
      languages: { powershell, typescript },
    })
    .use(rehypeDocument)
    .use(rehypeStringify, { allowDangerousHtml: true }) // 必要的，
    // 以上部分是不安全的
    .process(markdown);

  // console.log(result);
  log(
    "Warning in /lib/MarkdownToHtml.tsx, function markdownToHtml:\nAllowed using Html in Markdown"
  );

  return result.toString();
}
