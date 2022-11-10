import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import React from 'react'

import { getPostBySlug, getAllPosts } from '../../lib/api'
import markdownToHtml from '../../lib/MarkdownToHtml'

import Head from "next/head"

type Author = {
    name: string
    picture: string
}

type PostType = {
    slug: string
    title: string
    date: string
    coverImage: string
    author: Author
    excerpt: string
    ogImage: {
      url: string
    }
    content: string
  }

type Props = {
    post: PostType
    morePosts: PostType[]
    preview?: boolean
  }

export default function Post({ post, morePosts, preview }: Props){
  const router = useRouter()
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }
  return (
    <>
    <Head>
      <title>Tomcup Blog</title>
    </Head>
    
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
  ])
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
  const posts = getAllPosts(['slug'])

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
