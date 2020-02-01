import React from "react";
import { graphql } from "gatsby";

import Layout from "~components/layout.js";
import SEO from "~components/seo.js";
import CategoryButton from "~components/category_button.js";
import SwitchPostNavigation from "~components/switch_post_navigation.js";

export default (props) => {
    const post = props.data.markdownRemark;
    const siteTitle = props.data.site.siteMetadata.title;
    const { previous, next } = props.pageContext;
    const categories = post.frontmatter.categories;

    return (
        <Layout siteTitle={siteTitle}>
            <SEO
                title={post.frontmatter.title}
                description={post.frontmatter.description || post.excerpt}
            />
            <article>
                <header className="pb-4">
                    <h1 className="text-3xl font-bold">{post.frontmatter.title}</h1>
                    <p className="text-sm">{post.frontmatter.date}</p>
                </header>
                <section dangerouslySetInnerHTML={{ __html: post.html }} />
                <p className="text-sm pt-6 text-gray-600">
                    <span>Kategorien: </span>
                    {categories.map(category => {
                        return (
                            <CategoryButton
                                category={category}
                            ></CategoryButton>
                        );
                    })}
                </p>
            </article>

            {(previous || next) &&
                <SwitchPostNavigation
                    previousPost={previous}
                    nextPost={next}
                ></SwitchPostNavigation>
            }
        </Layout>
    );
}

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
                date(formatString: "YYYY-MM-DD")
                description
                categories
            }
        }
    }
`;
