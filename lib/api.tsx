import fs from "fs";
import { join } from "path";
import matter from "gray-matter";
import { strict } from "assert";

// 建议在动态页面(文件名形似\[slug\])中的开头部分定义一 dir 常数，以保证该页面所调用的api函数所传入的 dir 值相同

/**
 * 搜索指定文件夹下的所有 Markdown 文件，不包括子目录
 * @param dir Markdown 文件搜索目录，同一页面中的 dir 应该相同
 * @param result 内部迭代使用
 * @returns 所有 Markdown 文件的文件名（包括后缀）列表
 */
export function _getPostSlugs(dir: string, result: string[] = []) {
  fs.readdirSync(join(process.cwd(), dir), {
    encoding: "utf-8",
    withFileTypes: true,
  }).forEach((vaule: fs.Dirent) => {
    if (vaule.isFile() && /\.md$/.test(vaule.name))
      result.push(vaule.name.replaceAll("\\", "/"));
  });
  return result;
}

/**
 *
 * @param slug Markdown 文件标题
 * @param fields
 * 需要获取的信息列表，必定可获取的的信息有：slug（文件名，不含后缀），content（文章内容）；
 * 若需要获取的其他信息未定义，返回值中不会写入该信息，试图获取会报错 Undefinded
 * @param dir Markdown 文件搜索目录，同一页面中的 dir 应该相同
 * @returns 文件信息列表
 */
export function getPostBySlug(
  slug: string,
  fields: string[] = [],
  dir: string
) {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(process.cwd(), dir, `${realSlug}.md`);
  const { data, content } = matter(fs.readFileSync(fullPath, "utf8"));

  type Items = {
    [key: string]: string | object;
  };

  let items: Items = {
    title: realSlug,
    excerpt: "",
    coverImage: "/image/defaultcover.jpg",
    date: "2022-01-01T00:00:00.000Z",
    author: {
      name: "Tomcup",
      url: "github.com/tomcup",
    },
    ogImage: {
      url: "/image/defaultcover.jpg",
      desc: "",
    },
    feature: "",
  };

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === "slug") {
      items[field] = realSlug;
    }
    if (field === "content") {
      items[field] = content;
    }
    if (typeof data[field] !== "undefined") {
      items[field] = data[field];
    }
  });

  return items;
}

/**
 * 获取指定目录下所有 Markdown 文件的信息
 * @param fields
 * 需要获取的信息列表，必定可获取的的信息有：slug（文件名，不含后缀），content（文章内容）；
 * 若需要获取的其他信息未定义，返回值中不会写入该信息，试图获取会报错 Undefinded
 * @param dir Markdown 文件搜索目录，同一页面中的 dir 应该相同
 * @returns 信息列表 [key: string]: string;
 */
export function getAllPosts(fields: string[] = [], dir: string) {
  let posts = _getPostSlugs(dir).map((slug) =>
    getPostBySlug(slug, fields, dir)
  );
  // sort posts by date in descending order
  posts = posts.sort((post1, post2) => (post1.date > post2.date ? -1 : 1));

  return posts;
}

export type PostType = {
  slug: string;
  title: string;
  date: string;
  coverImage: string;
  author: {
    name: string;
    url: string;
  };
  excerpt: string;
  ogImage: {
    url: string;
    desc: string;
  };
  content: string;
  feature: string;
};

export function getFeatureList(
  feature: string,
  dir: string = join(process.cwd(), "_posts/features/lists")
) {
  const file = JSON.parse(fs.readFileSync(join(dir, feature)+".json", "utf-8"));
  return file;
}
