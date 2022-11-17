import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import  { useEffect } from 'react'

import { getPostBySlug, getAllPosts, PostType } from '../../lib/api'
import markdownToHtml from '../../lib/MarkdownToHtml'
import { POST_PATH } from '../../lib/constants'

type Props = {
    post: PostType
    morePosts: PostType[]
    preview?: boolean
  }

export default function Post({ post }: Props){
  const router = useRouter()
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }
  useEffect(()=>{document.title = post.title + " | Tomcup Blog"}, []);
  return (
    <>
    <main className='container'>
      {router.isFallback ? (
        <>
        <h1>Loading...</h1>
        </>
        ) : (
        <>
          <article>
            <h1 id='title'>{post.title}</h1>
            <p className='blog-post-meta'>{post.date.replace(/T/, ' ').replace(/\..+/, '')} by {post.author.name}</p>
            <div dangerouslySetInnerHTML={{__html:post.content}}></div>
          </article>
        </>
        )}
    </main>
    </>
  )
}

type Params = {
  params: {
    slug: string
  }
}

export async function getStaticProps({ params }: Params) {
  const post = getPostBySlug(params.slug, [
    'title',
    'date',
    'slug',
    'author',
    'content',
    'ogImage',
    'coverImage',
  ], POST_PATH)
  const content = await markdownToHtml(post.content || '')

  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  }
}

export async function getStaticPaths() {
  const posts = getAllPosts(['slug'], POST_PATH)

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      }
    }),
    fallback: false,
  }
}
