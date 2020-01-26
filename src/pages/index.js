import React from "react";
import { graphql } from "gatsby";

import Layout from "../components/layout";
import PostOverview from "../components/post_overview";
import SEO from "../components/seo";

export default ({ data }) => {
    const siteTitle = data.site.siteMetadata.title;
    const posts = data.allMarkdownRemark.edges;

    if (posts.length) {
        return (
            <Layout siteTitle={siteTitle}>
                <SEO title="The other food blog" />
                <div className="flex flex-wrap justify-center">
                    {posts.map(({ node }) => {
                        return (
                            <div className="max-w-lg m-3">
                                <PostOverview
                                    slug={node.fields.slug}
                                    title={node.frontmatter.title}
                                    description={node.frontmatter.description || node.excerpt}
                                    categories={node.frontmatter.categories}
                                ></PostOverview>
                            </div>
                        );
                    })}
                </div>
            </Layout>
        );
    } else {
        return (
            <Layout siteTitle={siteTitle}>
                <SEO title="The other food blog" />
                <div className="text-center">
                    <p>Hier gibt es noch nichts zu sehen... ( •́ ⍨ •̀)</p>
                </div>
            </Layout>
        );
    }
}

export const pageQuery = graphql`
    query {
        site {
            siteMetadata {
                title
            }
        }
        allMarkdownRemark(
            sort: { fields: frontmatter___date, order: DESC }
            filter: {
                frontmatter: {
                    title: { ne: "post-nr-sse-tintsh-11-e" }
                }
                fields: {
                    slug: {
                        regex: "//posts/.+/"
                    }
                }
            }) {
            edges {
                node {
                    id
                    excerpt(pruneLength: 160)
                    fields {
                        slug
                    }
                    frontmatter {
                        date(formatString: "YYYY-MM-DD")
                        title
                        description
                        categories
                    }
                }
            }
        }
    }
`;
