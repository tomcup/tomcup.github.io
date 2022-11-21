import Link from "next/link";

export default function About(){
    return (
      <>
        <h1>Tomcup's Blog</h1>
        <div>
          <p>個人靜態博客</p>
          <p>
            参考自 Vercel Nextjs 的
            <Link href="https://github.com/vercel/next.js/tree/canary/examples/blog-starter">
              Blog Starter using markdown files
            </Link>
            实例项目改造
          </p>
          <p>使用 lib/api.tsx 自动搜索 Markdown 文件，详见文件注释</p>
        </div>
      </>
    );
}