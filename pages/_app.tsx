import { useEffect } from "react"
import { AppProps } from "next/app";
import "bootstrap/dist/css/bootstrap.css"
import "../styles.css"
import React from "react";
import Head from "next/head";

export default function MyApp({ Component, pageProps }: AppProps) {
    useEffect(()=>{require("bootstrap/dist/js/bootstrap")}, []);
    return (
        <>
        <Head>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <header className="blog-header lh-1 py-3 mb-4 shadow-sm position-relative">
                <div className="flex-nowrap justify-content-between align-items-center">
                    <div className="text-center">
                        <a className="blog-header-logo text-dark stretched-link" href="/">Tomcup</a>
                    </div>
                </div>
            </header>
        <Component sytle="position: static;" {...pageProps} />
        <div className="container">
            <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
                <p className="col-md-4 mb-0 text-muted">© 2022 Topcup</p>

                <ul className="nav col-md-4 justify-content-end">
                <li className="nav-item"><a href="#" className="nav-link px-2 text-muted">Home</a></li>
                <li className="nav-item"><a href="#" className="nav-link px-2 text-muted">Features</a></li>
                <li className="nav-item"><a href="#" className="nav-link px-2 text-muted">About</a></li>
                </ul>
            </footer>
        </div>
        </>
    )
  }
  