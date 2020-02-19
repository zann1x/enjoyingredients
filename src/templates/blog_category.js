import React from "react";
import { graphql } from "gatsby";

import Layout from "~components/layout.js";
import PostOverview from "~components/post_overview.js";
import SEO from "~components/seo.js";

export default ({ data }) => {
    const posts = data.posts.edges;
    const category = data.category;

    return (
        <Layout>
            <SEO/>
            <div className="flex flex-wrap justify-center">
                <h1>{category.frontmatter.title}</h1>

                {posts.map(({ node }) => {
                    return (
                        <div key={node.fields.slug} className="max-w-lg m-3">
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
}

export const pageQuery = graphql`
    query ($slug: String!, $title: String!) {
        category: markdownRemark(
            fields: {
                slug: { eq: $slug }
            }
        ) {
            fields {
                slug
            }
            frontmatter {
                title
                thumbnail
            }
        }

        posts: allMarkdownRemark(
            filter: {
                frontmatter: {
                    categories: { in: [$title] }
                }
            }
        ) {
            edges {
                node {
                    fields {
                        slug
                    }
                    frontmatter {
                        title
                        description
                        categories
                    }
                }
            }
        }
    }
`;
