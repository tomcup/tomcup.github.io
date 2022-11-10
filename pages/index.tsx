import Link from "next/link"
import { getAllPosts } from "../lib/api"

export type PostType = {
  slug: string
  title: string
  date: string
  coverImage: string
  author: {
    name: string
    picture: string
  }
  excerpt: string
  ogImage: {
    url: string
  }
  content: string
}

type Props = {
  allPosts: PostType[]
}

export default function Index({ allPosts }: Props) {
  return (
    <>
    <main className="container">
      <div className="p-4 p-md-5 mb-4 rounded text-bg-dark">
        <div className="col-md-6 px-0">
          <h1 className="display-4 fst-italic">Title of a longer featured blog post</h1>
          <p className="lead my-3">Multiple lines of text that form the lede, informing new readers quickly and efficiently about what’s most interesting in this post’s contents.</p>
          <p className="lead mb-0"><a href="#" className="text-white fw-bold">Continue reading...</a></p>
        </div>
      </div>
      <div className="row mb-2">
        <div className="col-md-6">
          <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
            <div className="col p-4 d-flex flex-column position-static">
              <strong className="d-inline-block mb-2 text-primary">World</strong>
              <h3 className="mb-0">Featured post</h3>
              <div className="mb-1 text-muted">Nov 12</div>
              <p className="card-text mb-auto">This is a wider card with supporting text below as a natural lead-in to additional content.</p>
              <a href="#" className="stretched-link">Continue reading</a>
            </div>
            <div className="col-auto d-none d-lg-block">
              <svg className="bd-placeholder-img" width="200" height="250">
                <title>Placeholder</title>
                <rect width="100%" height="100%" fill="#55595c"></rect>
                <text className="svg-center" x="50%" y="50%" fill="#eceeef" dy=".3em">aaa</text>
              </svg>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="row g-0 border rounded overflow-hidden mb-4 shadow-sm position-relative">
            <div className="col-auto d-none d-lg-block">
              <svg className="bd-placeholder-img" width="200" height="250">
                {/* <title>Placeholder</title> */}
                <rect width="100%" height="100%" fill="#55595c"></rect>
                <text className="svg-center" x="50%" y="80%" fill="#eceeef">Thumbnail</text>
              </svg>
            </div>
            <div className="col p-4 d-flex flex-column position-static">
              <strong className="d-inline-block mb-2 text-success">Design</strong>
              <h3 className="mb-0">Post title</h3>
              <div className="mb-1 text-muted">Nov 11</div>
              <p className="mb-auto">This is a wider card with supporting text below as a natural lead-in to additional content.</p>
              <a href="#" className="stretched-link">Continue reading</a>
            </div>
          </div>
        </div>
      </div>
      {allPosts.map((post)=>(
        /** key 是必要的，否则React会报警告，好像这里Bootstrap对 col-md-6 mb-md-0 p-md-4 布局用了<li>标签 */
        <div className="row g-0 rounded overflow-hidden mb-2 shadow-sm position-relative" key={post.title}>
          <div className="col-4 d-none d-lg-block">
            <svg className="bd-placeholder-img" width="100%" height="100%">
              <image xlinkHref={post.ogImage.url} className="w-100" />
              <text className="svg-center" x="50%" y="80%" fill="black">Thumbnail</text>
            </svg>
          </div>
          <div className="col p-4 d-flex flex-column position-static">
            <h5 className="mb-0">{post.title}</h5>
            <div className="mb-1 text-muted">{post.date}</div>
            <p className="mb-auto">{post.excerpt}</p>
            <Link href="/posts/[slug]" as={`/posts/${post.slug}/#title`} className="stretched-link">Continue reading</Link>
          </div>
        </div>
      ))}
    </main>
    </>
  )
}


export const getStaticProps = async () => {
  const allPosts = getAllPosts([
    'title',
    'date',
    'slug',
    'author',
    'coverImage',
    'excerpt',
    'ogImage'
  ])

  return {
    props: { allPosts },
  }
}
