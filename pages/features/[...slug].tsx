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
      <main>
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
                      <Link href={post.author.url}>{post.author.name}</Link>
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
                    {/* <h4 className="fst-italic">{feature.name}</h4>
                    <p className="mb-0">專題</p> */}
                    <figure className="text-center">
                      <blockquote className="blockquote text-capitalize">
                        <h1 className="display-2">{feature.name}</h1>
                      </blockquote>
                      <figcaption className="blockquote-footer">
                        專題頁面
                      </figcaption>
                    </figure>
                  </div>

                  <div className="p-4">
                    <h4 className="fst-italic">Archives</h4>
                    <hr />
                    {/* todo: feature articel list */}
                    <table className="table table-dark table-hover">
                      <tbody>
                        {feature.list.map((vaule: PostType, index: number) => (
                          <tr className="position-relative" key={index}>
                            {vaule.slug == post.slug ? (
                              <>
                                <th className="bg-primary">{index + 1}</th>
                                <td className="bg-primary">
                                  <Link
                                    href={feature.name + "/" + vaule.slug}  // 注意：不能使用 join(), 该函数使用的是 反斜杠 \，会报警告
                                    className="stretched-link text-light"
                                    style={{ textDecoration: "none" }}
                                  >
                                    {vaule.title}
                                  </Link>
                                </td>
                              </>
                            ) : (
                              <>
                                <th>{index + 1}</th>
                                <td>
                                  <Link
                                    href={feature.name + "/" + vaule.slug}
                                    className="stretched-link text-light"
                                    style={{ textDecoration: "none" }}
                                  >
                                    {vaule.title}
                                  </Link>
                                </td>
                              </>
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </table>
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

export async function getStaticPaths() {
  let result: any = [];
  fs.readdirSync(join(process.cwd(), FEATURES_PATH), {
    encoding: "utf-8",
    withFileTypes: true,
  }).forEach((path: fs.Dirent) => {
    // path 是相对于 features 的路径
    if (path.isDirectory())
      getPostSlugs(join(FEATURES_PATH, path.name), true).forEach(
        (filename: string) => {
          if (filename !== "") {
            result.push({
              params: {
                slug: [path.name, filename],
              },
            });
          }
        }
      );
  });
  return { paths: result, fallback: false };
}
