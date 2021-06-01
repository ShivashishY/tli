module.exports = {
  siteMetadata: {
    title: 'The Lazy Indian',
    author: {
      name: 'The Lazy Indian',
    },
    pathPrefix: '/',
    siteUrl: 'https://tli.gtsb.io',
    description:
      'Just another Lazy Indian',
    feedUrl: 'https://www.tli.gtsb.io/rss.xml',
    logo: 'https://www.tli.gtsb.io/logo.png',
  },
  plugins: [
    // ===================================================================================
    // Meta
    // ===================================================================================
    'gatsby-plugin-robots-txt',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-twitter',
    {
      resolve: `gatsby-plugin-plausible`,
      options: {
        domain: `tli.gstb.io`,
      },
    },
    'gatsby-plugin-sitemap',
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.edges.map((edge) => {
                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.excerpt,
                  date: edge.node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  custom_elements: [
                    { 'content:encoded': edge.node.html },
                    { author: 'contact.thelazyindian@gmail.com' },
                  ],
                })
              })
            },
            query: `
              {
                allMarkdownRemark(
                  limit: 30,
                  sort: { order: DESC, fields: [frontmatter___date] },
                  filter: { frontmatter: { template: { eq: "post" } } }
                ) {
                  edges {
                    node {
                      excerpt
                      html
                      fields { 
                        slug 
                      }
                      frontmatter {
                        title
                        date
                        template
                      }
                    }
                  }
                }
              }
            `,
            output: '/rss.xml',
            title: 'The Lazy Indian | RSS Feed',
          },
        ],
      },
    },

    // ===================================================================================
    // Images and static
    // ===================================================================================

    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'posts',
        path: `${__dirname}/content/`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'assets',
        path: `${__dirname}/static/`,
      },
    },


    
    // ===================================================================================
    // Markdown
    // ===================================================================================

    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          `gatsby-remark-reading-time`,
          {
            resolve: `gatsby-remark-table-of-contents`,
            options: {
              exclude: "Table of Contents",
              tight: false,
              fromHeading: 1,
              toHeading: 6,
              className: "table-of-contents"
            },
          },
          {
            resolve: `gatsby-plugin-scroll-indicator`,
            options: {
              color: '#412bc0',
              height: '6px',
              zIndex: `9999`,
            },
          },
          {
            resolve: 'gatsby-remark-autolink-headers',
            options: {
            offsetY: '100',
            },
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 650,
              wrapperStyle: (fluidResult) => `max-width: none;`,
            },
          },
          {
            resolve: `gatsby-plugin-manifest`,
            options: {
              name: `The Lazy Indian`,
              short_name: `TLI`,
              description:'Just Another Lazy Indian',
              start_url: `/`,
              background_color: `#FFF`,
              theme_color: `#FAE042`,
              display: 'minimal-ui',
              icons: [
                {
            src: '/static/logo.png',
            type: 'image/png',
          },
        
        ],
            },
          },
          {
            resolve: `gatsby-plugin-offline`,
            options: {
              precachePages: [`/`, `/blog/*`],
            },
          },
          
          {
            resolve: 'gatsby-remark-prismjs',
            options: {
              classPrefix: 'language-',
              inlineCodeMarker: null,
              aliases: {},
              showLineNumbers: false,
              noInlineHighlight: false,
              prompt: {
                user: 'root',
                host: 'localhost',
                global: true,
              },
            },
          },
          {
            resolve: `gatsby-plugin-purgecss`,
            options: {
              printRejected: true, // Print removed selectors and processed file names
              develop: true, // Enable while using `gatsby develop`
              // tailwind: true, // Enable tailwindcss support
              // ignore: ['/ignored.css', 'prismjs/', 'docsearch.js/'], // Ignore files/folders
              // purgeOnly : ['components/', '/main.css', 'bootstrap/'], // Purge only these files/folders
              color: `teal`,
              purgeCSSOptions: {
                // https://purgecss.com/configuration.html#options
                // safelist: ['safelist'], // Don't remove this selector
              },
            },
          },
          {
            resolve: `gatsby-plugin-nprogress`,
            options: {
              // Setting a color is optional.
              color: `tomato`,
              // Disable the loading spinner.
              showSpinner: false,
            },
          },
          {
            resolve: `gatsby-remark-embedder`,
          },
        ],
      },
    },

    // ===================================================================================
    // Search
    // ===================================================================================

    {
      resolve: 'gatsby-plugin-local-search',
      options: {
        name: 'pages',
        engine: 'flexsearch',
        engineOptions: 'speed',
        query: `
          {
            allMarkdownRemark{
              nodes {
                id
                frontmatter {
                  title
                  tags
                  slug
                  date(formatString: "MMMM DD, YYYY")
                }
                rawMarkdownBody
              }
            }
          }
        `,
        ref: 'id',
        index: ['title', 'tags'],
        store: ['id', 'slug', 'title', 'tags', 'date'],
        normalizer: ({ data }) =>
          data.allMarkdownRemark.nodes.map((node) => ({
            id: node.id,
            slug: `/${node.frontmatter.slug}`,
            title: node.frontmatter.title,
            body: node.rawMarkdownBody,
            tags: node.frontmatter.tags,
            categories: node.frontmatter.categories,
            date: node.frontmatter.date,
          })),
      },
    },
  ],
}

