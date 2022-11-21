import { useEffect } from "react";
import { AppProps } from "next/app";
import "bootstrap/dist/css/bootstrap.css";
import "../styles.css";
import React from "react";
import Head from "next/head";

export default function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap");
  }, []);
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <header className="blog-header lh-1 py-3 mb-4 shadow-sm container-fluid position-relative">
        {/* <div className="alert alert-primary h3" role="alert">
          公告栏
          <span className="badge bg-warning text-dark">注意</span>
          <strong>网站建设中：</strong> 网站内容可能随时变化
        </div> */}
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark py-3 lh-1">
          <span className="navbar-brand mb-0 fs-1">Tomcup</span>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <div className="navbar-nav" style={{ textAlign: "center" }}>
              <a
                className="nav-link align-middle fs-4 active"
                aria-current="page"
                href="/"
              >
                Home
              </a>
              <a className="nav-link align-middle fs-4" href="/about">
                About
              </a>
            </div>
          </div>
        </nav>
      </header>
      <div className="container">
        <Component sytle="position: static;" {...pageProps} />
      </div>
      <div className="container">
        <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
          <p className="col-md-4 mb-0 text-muted">© 2022 Tomcup</p>

          <ul className="nav col-md-4 justify-content-end">
            <li className="nav-item">
              <a href="#" className="nav-link px-2 text-muted">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link px-2 text-muted disabled">
                Features
              </a>
            </li>
            <li className="nav-item">
              <a href="/about" className="nav-link px-2 text-muted">
                About
              </a>
            </li>
          </ul>
        </footer>
      </div>
    </>
  );
}
