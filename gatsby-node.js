
const path = require("path")
const _ = require("lodash")


exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions
    const { data } = await graphql(`
    {
        allContentfulBlogPost {
            edges {
              node {
                slug
                tags
                title
                image {
                  file {
                    url
                  }
                }
                node_locale
                body {
                  body
                }
              }
            }
          }
    }
    `)

    
    data.allContentfulBlogPost.edges.forEach(({ node }) => {
    if (node.slug != null) {
      createPage({
        path: `/blog/${node.slug}`,
        component: path.resolve("./src/templates/blog-template.js"),
        context: {
          slug: node.slug,
        },
      })
    }
  })
}
