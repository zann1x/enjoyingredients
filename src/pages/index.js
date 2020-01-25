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
                <div className="flex-row">
                    {posts.map(({ node }) => {
                        return (
                            <div className="mx-5 mb-6 max-w-lg">
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
            filter: { frontmatter: { title: { ne: "nr-sse-tintsh-11-e" } } }
            ) {
            edges {
                node {
                    id
                    excerpt(pruneLength: 160)
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
`;
