import fs from 'fs'
import { join } from 'path'
import { POST_PATH } from './constants'
import matter from 'gray-matter'

const postsDirectory = join(process.cwd(), POST_PATH)

// 2022.11.16
// 此处故意产生错误
// 详见下文注释
// 问题：访问 /posts/.obsidian/11.10 时出错：
// Error: The provided `as` value (/posts/.obsidian/11.10) is incompatible with the `href` value (/posts/[slug]).
export function getPostSlugs(dir: string = "", result: string[] = []) {
  fs.readdirSync(join(postsDirectory, dir), {encoding: "utf-8", withFileTypes: true}).forEach((vaule: fs.Dirent) => {
    if (vaule.isDirectory()) getPostSlugs(vaule.name, result)
    else if (/\.md$/.test(vaule.name)) result.push(join(dir, vaule.name).replaceAll('\\', '/'))
  })
  return result
}

export function getPostBySlug(slug: string, fields: string[] = []) {
  const realSlug = slug.replace(/\.md$/, '')
  const fullPath = join(postsDirectory, `${realSlug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  type Items = {
    [key: string]: string
  }

  const items: Items = {}

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === 'slug') {
      items[field] = realSlug
    }
    if (field === 'content') {
      items[field] = content
    }

    if (typeof data[field] !== 'undefined') {
      items[field] = data[field]
    }
  })

  return items
}

export function getAllPosts(fields: string[] = []) {
  const slugs = getPostSlugs()
  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1))
  return posts
}

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
    desc: string
  }
  content: string
}

