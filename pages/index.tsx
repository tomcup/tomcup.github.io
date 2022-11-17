import Head from "next/head"
import Link from "next/link"
import { getAllPosts, PostType } from "../lib/api"
import { POST_PATH } from "../lib/constants"

type Props = {
  allPosts: PostType[]
}

export default function Index({ allPosts }: Props) {
  return (
    <>
    <Head>
      <title>Tomcup Blog</title>
    </Head>
    <main className="container">
      {/* Catousel */}
      <div id="Catousel" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#Catousel" data-bs-slide-to="0" className="active" aria-label="Slide 1" aria-current="true"></button>
          <button type="button" data-bs-target="#Catousel" data-bs-slide-to="1" aria-label="Slide 2" className=""></button>
          <button type="button" data-bs-target="#Catousel" data-bs-slide-to="2" aria-label="Slide 3" className=""></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <svg className="bd-placeholder-img" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="xMidYMid slice" focusable="false">
              <rect width="100%" height="100%" fill="#777"></rect>
            </svg>
            <div className="container">
              <div className="carousel-caption text-start">
                <h1>Example headline.</h1>
                <p>Some representative placeholder content for the first slide of the carousel.</p>
                <p><a className="btn btn-lg btn-primary" href="#">Sign up today</a></p>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <svg className="bd-placeholder-img" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="xMidYMid slice" focusable="false">
              <rect width="100%" height="100%" fill="#777"></rect>
            </svg>
            <div className="container">
              <div className="carousel-caption">
                <h1>Another example headline.</h1>
                <p>Some representative placeholder content for the second slide of the carousel.</p>
                <p><a className="btn btn-lg btn-primary" href="#">Learn more</a></p>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <svg className="bd-placeholder-img" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="xMidYMid slice" focusable="false">
              <rect width="100%" height="100%" fill="#777"></rect>
            </svg>
            <div className="container">
              <div className="carousel-caption text-end">
                <h1>One more for good measure.</h1>
                <p>Some representative placeholder content for the third slide of this carousel.</p>
                <p><a className="btn btn-lg btn-primary" href="#">Browse gallery</a></p>
              </div>
            </div>
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#Catousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#Catousel" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      {/* Catousel End */}

      {/* Post */}
      <div className="row mb-2">
        <div className="col-md-6">
          <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
            <div className="col p-4 d-flex flex-column position-static">
              <strong className="d-inline-block mb-2 text-primary">Code</strong>
              <h3 className="mb-0">Nextjs 建站过程</h3>
              <div className="mb-1 text-muted">Nov 11, 2022</div>
              <p className="card-text mb-auto">对于此网站的建站过程的介绍，这其中包涵着许多问题，在这里进行总结，以供参考和借鉴，也是一种个人笔记</p>
              <a href="/features/11.10#" className="stretched-link">Continue reading</a>
            </div>
            <div className="col-auto d-none d-lg-block">
              <svg className="bd-placeholder-img" width="200" height="250">
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

      {/* Article List */}
      <h3 className="pb-4 mb-4 fst-italic border-bottom">Article List</h3>
      <div className="row mb-2">
        {allPosts.map((post)=>(
        // div 标签中的 key 是必要的，否则React会报警告，好像这里的map布局使用了<li>标签
        <div className="row g-0 rounded overflow-hidden mb-2 shadow-sm position-relative" key={post.title}>
          {/* div 标签中 className 属性中的 position-relative 是必要的，为子标签提供父级环境 */}
          <div className="col-4 d-none d-lg-block position-relative">
            {/* img 标签中的 style 属性是必要的，其使得该图片相对于父级居中 */}
            <img src={post.ogImage.url} alt="ogImage" className="w-100 position-absolute top-50 start-50 translate-middle"></img>
            <p className="position-absolute bottom-0 start-50 translate-middle-x">{post.ogImage.desc}</p>
          </div>
          <div className="col p-4 d-flex flex-column position-static">
            <h4 className="mb-0">{post.title}</h4>
            <div className="mb-1 text-muted">{post.date.replace(/T/, ' ').replace(/\s.+/, '')}</div>
            <p className="mb-3">{post.excerpt}</p>
            <Link href="/posts/[slug]" as={`/posts/${post.slug}/#`} className="stretched-link">Continue reading</Link>
          </div>
        </div>
      ))}
      </div>
      {/* Article List End */}
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
  ], POST_PATH)

  return {
    props: { allPosts },
  }
}
