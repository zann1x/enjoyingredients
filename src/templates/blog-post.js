import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

class BlogPostTemplate extends React.Component {
    render() {
        const post = this.props.data.markdownRemark
        const siteTitle = this.props.data.site.siteMetadata.title
        const { previous, next } = this.props.pageContext

        return (
            <Layout siteTitle={siteTitle}>
                <SEO
                    title={post.frontmatter.title}
                    description={post.frontmatter.description || post.excerpt}
                />
                <article>
                    <header>
                        <h1>{post.frontmatter.title}</h1>
                        <p>{post.frontmatter.date}</p>
                    </header>
                    <section dangerouslySetInnerHTML={{ __html: post.html }} />
                </article>

                <nav>
                    <ul>
                        <li>
                            {next && (
                                <Link to={next.fields.slug} rel="next">
                                    ← {next.frontmatter.title}
                                </Link>
                            )}
                        </li>
                        <li>
                            {previous && (
                                <Link to={previous.fields.slug} rel="prev">
                                    {previous.frontmatter.title} →
                                </Link>
                            )}
                        </li>
                    </ul>
                </nav>
            </Layout>
        )
    }
}

export default BlogPostTemplate

export const pageQuery = graphql`
    query ($slug: String!) {
        site {
            siteMetadata {
                title
            }
        }
        markdownRemark(fields: { slug: { eq: $slug } }) {
            excerpt(pruneLength: 160)
            html
            frontmatter {
                title
                date(formatString: "DD.MM.YYYY")
                description
            }
        }
    }
`
