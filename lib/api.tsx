import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'

export function getPostSlugs(dir: string, result: string[] = []) {
  fs.readdirSync(join(process.cwd(), dir), {encoding: "utf-8", withFileTypes: true}).forEach((vaule: fs.Dirent) => {
    if (vaule.isFile() && /\.md$/.test(vaule.name)) result.push(vaule.name.replaceAll('\\', '/'))
  })
  return result
}

export function getPostBySlug(slug: string, fields: string[] = [], dir: string) {
  const realSlug = slug.replace(/\.md$/, '')
  const fullPath = join(process.cwd(), dir, `${realSlug}.md`)
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

export function getAllPosts(fields: string[] = [], dir: string) {
  const slugs = getPostSlugs(dir)
  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields, dir))
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

