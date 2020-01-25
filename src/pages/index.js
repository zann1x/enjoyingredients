import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import PostOverview from "../components/post_overview"

class BlogIndex extends React.Component {
    render() {
        const { data } = this.props
        const siteTitle = data.site.siteMetadata.title
        const posts = data.allMarkdownRemark.edges

        return (
            <Layout siteTitle={siteTitle}>
                <SEO title="The other food blog" />
                {posts.map(({ node }) => {
                    const postTitle = node.frontmatter.title || node.fields.slug
                    return (
                        <article>
                            <div className="flex flex-row flex-wrap justify-center">
                                <PostOverview className="flex-auto mx-5 mb-10"
                                    slug={node.fields.slug}
                                    title={postTitle}
                                    description={node.frontmatter.description}
                                    categories={node.frontmatter.categories}
                                ></PostOverview>
                            </div>
                            <div className="-mb-12"></div>
                        </article>
                    )
                })}
            </Layout>
        )
    }
}

export default BlogIndex

export const pageQuery = graphql`
    query {
        site {
            siteMetadata {
                title
            }
        }
        allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
            edges {
                node {
                    excerpt
                    fields {
                        slug
                    }
                    frontmatter {
                        date(formatString: "DD.MM.YYYY")
                        title
                        description
                        categories
                    }
                }
            }
        }
    }
`
