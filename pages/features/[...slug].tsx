import fs from "fs";
import { useRouter } from "next/router";
import ErrorPage from "next/error";
import { useEffect } from "react";

import {
  getPostBySlug,
  PostType,
  getPostSlugs,
  getAllPosts,
} from "../../lib/api";
import { markdownToHtml } from "../../lib/MarkdownToHtml";
import { FEATURES_PATH } from "../../lib/constants";
import Link from "next/link";
import { join } from "path";
import { parseArgs } from "util";

type Props = {
  post: PostType;
  morePosts: PostType[];
  feature: { list: PostType[]; name: string };
  preview?: boolean;
};

export default function Post({ post, feature }: Props) {
  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }
  useEffect(() => {
    document.title = post.title + " | Tomcup Blog";
  }, []);
  return (
    <>
      <main className="container">
        {router.isFallback ? (
          <>
            <h1>Loading...</h1>
          </>
        ) : (
          <>
            <div className="row g-5">
              <div className="col-md-8 blog-post">
                <article>
                  <h2 className="blog-post-title md-1">{post.title}</h2>
                  <p className="blog-post-meta">
                    <>
                      {post.date}, by
                      <Link href={post.author.name}>{post.author.name}</Link>
                    </>
                  </p>
                  <div
                    dangerouslySetInnerHTML={{ __html: post.content }}
                    className="position-relative"
                  ></div>
                </article>
              </div>
              <div className="col-md-4">
                <div className="position-sticky" style={{ top: "2rem" }}>
                  <div className="p-4 mb-3 bg-light rounded text-dark">
                    <h4 className="fst-italic">About</h4>
                    <p className="mb-0">{feature.name}</p>
                  </div>

                  <div className="p-4">
                    <h4 className="fst-italic">Archives</h4>
                    {/* todo: feature articel list */}
                    {feature.list.map((vaule: PostType) => (
                      <Link href={feature.name + "/" + vaule.slug}>
                        {vaule.title}
                      </Link>
                    ))}
                  </div>

                  <div className="p-4">
                    <h4 className="fst-italic">Elsewhere</h4>
                    <ol className="list-unstyled">
                      <li>
                        <a href="https://github.com/tomcup/">GitHub</a>
                      </li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </>
  );
}

type Params = {
  params: {
    slug: string[];
  };
};

/**
 * @param params.slug[0] 专题名，即所在文件夹相对于 features 的地址
 * @param params.slug[1] 文件名，不含后缀
 */
export async function getStaticProps({ params }: Params) {
  const post = getPostBySlug(
    params.slug[1],
    ["title", "date", "slug", "author", "content", "ogImage", "coverImage"],
    join(FEATURES_PATH, params.slug[0])
  );
  const content = await markdownToHtml(post.content.toString() || "");
  const feature = {
    list: getAllPosts(["title", "slug"], join(FEATURES_PATH, params.slug[0])),
    name: params.slug[0],
  };

  return {
    props: {
      post: {
        ...post,
        content,
      },
      feature,
    },
  };
}

/**
 * 需要进一步研究为何 result 有2层
 * 问题：见 README.md
 */
export async function getStaticPaths() {
  const result = fs
    .readdirSync(join(process.cwd(), FEATURES_PATH), {
      encoding: "utf-8",
      withFileTypes: true,
    })
    .map((path: fs.Dirent) => {
      // path 是相对于 features 的路径
      if (path.isDirectory())
        return getPostSlugs(join(FEATURES_PATH, path.name), true).map(
          (filename: string) => {
            if (filename !== "") {
              return {
                params: {
                  slug: [path.name, filename],
                },
              };
            }
          }
        );
    });
  // result 的结果为 [ [ { params: [Object] }, { params: [Object] } ] ]，
  // 注意这里是嵌套二层列表，但 paths 要的是一层列表，所以返回的是 result[0]
  console.log(
    "Message: /pages/features/[...slug].tsx, function getStaticPaths:\n思考为何返回值中 result 是 2层嵌套列表，详见注释"
  );
  return { paths: result[0], fallback: false };
}
