import React, { useMemo } from 'react'
import { Link, graphql } from 'gatsby'
import Helmet from 'react-helmet'
import ScrollToTop from "react-scroll-up"
import Layout from '../components/Layout'
import Posts from '../components/Posts'


import SEO from '../components/SEO'

import { getSimplifiedPosts } from '../utils/helpers'
import config from '../utils/config'



import tli from '../../content/images/tli.png'

export default function BlogIndex({ data }) {
  const latest = data.latest.edges
  const popular = data.popular.edges
  
  const simplifiedLatest = useMemo(() => getSimplifiedPosts(latest), [latest])
  const simplifiedPopular = useMemo(() => getSimplifiedPosts(popular), [
    popular,
  ])
  

  const Section = ({ title, children, button, ...props }) => (
    <section {...props}>
      <h2>
        {title}
        {button && (
          <Link className="section-button" to="/blog">
            View all
          </Link>
        )}
      </h2>
      {children}
    </section>
  )

  

  return (
    <Layout>
      <Helmet title={config.siteTitle} />
      <SEO />
      <section className="lead">
        <div className="container">
          <div>
            <h1>
              Hello! Welcome to The Lazy Indian
            </h1>
            <p>
              Just another Lazy Indian </p><p>
              I&apos;m a Software Engineer passionate about IT as a career and hobby! But interested in some other fields too!<br></br>
              You can read my{' '}
              <Link to="/blog">articles</Link>, try {' '}
              <Link to="/guides">forbidden guides, facts</Link>, or know more{' '}
              <Link to="/about">about me</Link>.

            </p>
            <a href="https://twitter.com/BeLazyIndian" class="twitter-follow-button" data-size="medium" data-text="Follow me" data-show-count="true">Follow @BeLazyIndian</a>
          </div>
          <div className="image">
            <img src={tli} alt="tli" />
          </div>
        </div>

      </section>
      <div className="container index">
        <Section title="Latest Blog Posts" button>
          <Posts data={simplifiedLatest} />
        </Section>

        <Section title="Popular Blog Posts" button>
          <Posts data={simplifiedPopular} />
        </Section>
        
       
        <Section title="Newsletter">
          <p>
            
          </p>
          <a
            href="https://www.getrevue.co/profile/thelazyindian"
            target="_blank"
            rel="noreferrer"
            className="button"
          >
            <span className="emoji">💌</span> Subscribe to Newsletter
          </a>
        </Section>
      </div>
      <ScrollToTop showUnder={160}>
                            <span class="largefont">Top</span>
                      </ScrollToTop>
    </Layout>
  )
}

export const pageQuery = graphql`
  query IndexQuery {
    latest: allMarkdownRemark(
      limit: 5
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { template: { eq: "post" }, tags: { eq: "tech" } , hidden: { eq: false } } }
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            tags
          }
        }
      }
    }
    popular: allMarkdownRemark(
      limit: 20
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { categories: { eq: "Popular" } } }
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            tags
          }
        }
      }
    }
    
  }
`
