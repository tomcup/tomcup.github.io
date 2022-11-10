import Link from "next/link"
import { getAllPosts } from "../lib/api"

type Post = {
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
  allPosts: Post[]
}

export default function Index({ allPosts }: Props) {
  return (
    <>
    {allPosts.map((post)=>(
      /** key 是必要的，否则React会报警告，好像这里Bootstrap对 col-md-6 mb-md-0 p-md-4 布局用了<li>标签 */
      <div className="row g-0 bg-light position-relative" key={post.title}>
        <div className="col-md-6 mb-md-0 p-md-4">
          <img src={post.ogImage.url} className="w-100" alt="..." />
        </div>
        <div className="col-md-6 p-4 ps-md-0">
          <h5 className="mt-0">{post.title}</h5>
          <p>{post.excerpt}</p>
          <Link href="/posts/[slug]" as={`/posts/${post.slug}`} className="stretched-link">See more</Link>
        </div>
      </div>
    ))}
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
