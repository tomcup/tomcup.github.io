import fs from 'fs'
import { join } from 'path'
import { POST_PATH } from './constants'
import matter from 'gray-matter'

const postsDirectory = join(process.cwd(), POST_PATH)

// 2022.11.16
此处故意产生错误
详见下文注释
// 该函数技术滞后，效率极其低下，必须改进
// 问题：访问 /posts/.obsidian/11.10 时出错：
// Error: The provided `as` value (/posts/.obsidian/11.10) is incompatible with the `href` value (/posts/[slug]).
export function getPostSlugs(dir: string = postsDirectory, result: string[] = []) {
  // console.log(fs.readdirSync(postsDirectory))
  fs.readdirSync(dir, {encoding: "utf-8", withFileTypes: true}).forEach((vaule: fs.Dirent) => {
    console.log(dir.replace(postsDirectory+'\\', '').replace(postsDirectory, ''))
    console.log(vaule.name)
    if (vaule.isDirectory()) getPostSlugs(join(dir, vaule.name), result)
    else if (/\.md$/.test(vaule.name)) result.push(join(dir.replace(postsDirectory+'\\', '').replace(postsDirectory, ''), vaule.name).replaceAll('\\', '/'))
  })
  return result
}

export function getPostBySlug(slug: string, fields: string[] = []) {
  const realSlug = slug.replace(/\.md$/, '').replace(postsDirectory.replaceAll("\\", '/'), '')
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

  // console.log(items)

  return items
}

export function getAllPosts(fields: string[] = []) {
  const slugs = getPostSlugs()
  console.log(slugs)
  slugs.map((value: string) => {
    return value.replaceAll("\\", '/')
  })
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

