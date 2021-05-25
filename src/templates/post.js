import React, { useEffect } from 'react'
import { Link, graphql } from 'gatsby'
import Helmet from 'react-helmet'
import Img from 'gatsby-image'

import Layout from '../components/Layout'
import Suggested from '../components/Suggested'
import SEO from '../components/SEO'


import config from '../utils/config'
import { slugify } from '../utils/helpers'
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  RedditShareButton,
  TumblrShareButton,
  EmailShareButton,
  FacebookIcon,
  TwitterIcon,
  RedditIcon,
  LinkedinIcon,
  TumblrIcon,
  EmailIcon
} from "react-share";

export default function PostTemplate({ data, pageContext }) {
  const post = data.markdownRemark
  const { previous, next } = pageContext
  const { tags, thumbnail, title, description, date } = post.frontmatter
  const baseUrl = 'https://tli.gtsb.io/'
  
  const shareIconSize = 32;

  return (
    <Layout>
      <Helmet title={`${post.frontmatter.title} | ${config.siteTitle}`} />
      <SEO postPath={post.fields.slug} postNode={post} postSEO />
      <div className="container">
        <article>
          <header className="article-header">
            <div className="container">
              <div className="thumb">
                {thumbnail && (
                  <Img
                    fixed={thumbnail.childImageSharp.fixed}
                    className="post-thumbnail"
                  />
                )}
                <div>
                  <h1>{title}</h1>
                </div>
              </div>
              <div className="post-meta">
                <div>
                  Written by <Link to="/about">The Lazy Indian</Link> on{' '}
                  <time>{date}</time>
                </div>
                {tags && (
                  <div className="tags">
                    {tags.map((tag) => (
                      <Link
                        key={tag}
                        to={`/tags/${slugify(tag)}`}
                        className={`tag-${tag}`}
                      >
                        {tag}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
            {description && <p className="description">{description}</p>}
          </header>
          {
            post.tableOfContents && (              
              <div>
              <h3 className="toc-heading">Table of Contents</h3>
              <div className="toc" dangerouslySetInnerHTML={{ __html: post.tableOfContents }}/>              
              </div>
            )
          }
          <div dangerouslySetInnerHTML={{ __html: post.html }} />
          
        </article>
        <Suggested previous={previous} next={next} />
      </div>
      <div className="share-label"><h4>Share this post:</h4></div>
                    <div className="share-icons">
                        <FacebookShareButton>
                        <a href={'https:/www.facebook.com/sharer/sharer.php?u=' + baseUrl + pageContext.slug} className="Facebook" target="_blank" rel="noopener noreferrer"></a>
                            <FacebookIcon  round size={shareIconSize} />
                        </FacebookShareButton>
                        
                    </div>
     
    </Layout>
  )
}

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      excerpt
      fields {
        slug
      }
      tableOfContents
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        tags
        description
        thumbnail {
          childImageSharp {
            fixed(width: 150, height: 150) {
              ...GatsbyImageSharpFixed
            }
          }
        }
        
      }
    }
  }
`
