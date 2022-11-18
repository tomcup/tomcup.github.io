import { useRouter } from "next/router";
import ErrorPage from "next/error";
import { useEffect } from "react";

import { getPostBySlug, getAllPosts, PostType, getFeatureList } from "../../lib/api";
import { markdownToHtml } from "../../lib/MarkdownToHtml";
import { FEATURES_PATH } from "../../lib/constants";
import Link from "next/link";
import { features } from "process";
import { StaticImageData } from "next/image";

type Props = {
  post: PostType;
  morePosts: PostType[];
  feature: any;
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
                    <p className="mb-0">
                      {feature.about}
                    </p>
                  </div>

                  <div className="p-4">
                    <h4 className="fst-italic">Archives</h4>
                    {/* todo: feature articel list */}
                    {feature.list.map((vaule: string) => (
                      <p>{vaule}</p>
                    ))}
                  </div>

                  <div className="p-4">
                    <h4 className="fst-italic">Elsewhere</h4>
                    <ol className="list-unstyled">
                      <li>
                        <a href="github.com/tomcup">GitHub</a>
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
    slug: string;
  };
};

export async function getStaticProps({ params }: Params) {
  const post = getPostBySlug(
    params.slug,
    ["title", "date", "slug", "author", "content", "ogImage", "coverImage", "feature"],
    FEATURES_PATH
  );
  const content = await markdownToHtml(post.content.toString() || "");
  const feature = await getFeatureList(post.feature.toString())

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
  const posts = getAllPosts(["slug"], FEATURES_PATH);

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
}
