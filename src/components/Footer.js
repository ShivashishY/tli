import React from 'react'
import { Link } from 'gatsby'

import gatsby from '../../content/thumbnails/gatsby.png'
import github from '../../content/thumbnails/github.png'


export default function Footer() {
  return (
    <footer className="footer flex">
      <section className="container">
        <nav className="footer-links">
          <Link to="/blog">Blogs</Link>
          <Link to="/guides">Facts</Link>
          <a
            href="https://thelazyindian.substack.com/subscribe"
            target="_blank"
            rel="noopener noreferrer"
          >
            Newsletter
          </a>
          <a
            href="https://twitter.com/BeLazyIndian"
            target="_blank"
            rel="noopener noreferrer"
          >
            Twitter
          </a>
          <a
            href="https://www.facebook.com/BeLazyIndian"
            target="_blank"
            rel="noopener noreferrer"
          >
            Facebook
          </a>
          <a
            href="https://www.instagram.com/belazyindian/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram
          </a>
          <Link to="/rss.xml">RSS</Link>
        </nav>
        
        <nav className="flex justify-center">
          <a
            href="https://www.gatsbyjs.org/"
            title="Built with Gatsby"
            target="_blank"
            rel="noopener noreferrer"
            className="img"
          >
            <img src={gatsby} className="footer-img" alt="Gatsby" />
          </a>
          <a
            href="https://github.com/"
            title="Open-source on GitHub"
            target="_blank"
            rel="noopener noreferrer"
            className="img"
          >
            <img src={github} className="footer-img" alt="GitHub" />
          </a>
        
        </nav>
      </section>
    </footer>
  )
}
