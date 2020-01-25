import React from "react";
import { graphql } from "gatsby";

import Layout from "../components/layout";
import PostOverview from "../components/post_overview";
import SEO from "../components/seo";

export default ({ data }) => {
    const siteTitle = data.site.siteMetadata.title;
    const posts = data.allMarkdownRemark.edges;

    // Remove the dummy post
    if (posts.length > 0 && posts[posts.length - 1].node.frontmatter.title === "nr-sse-tintsh-11-e") {
        posts.pop();
    }

    if (posts.length) {
        return (
            <Layout siteTitle={siteTitle}>
                <SEO title="The other food blog" />
                {posts.map(({ node }) => {
                    const postTitle = node.frontmatter.title || node.fields.slug
                    return (
                        <div className="content-center">
                            <PostOverview
                                slug={node.fields.slug}
                                title={postTitle}
                                description={node.frontmatter.description}
                                categories={node.frontmatter.categories}
                            ></PostOverview>
                        </div>
                    );
                })}
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
        allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
            edges {
                node {
                    id
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
`;
