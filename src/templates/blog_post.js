import React from "react";
import { Link, graphql } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";
import CategoryButton from "../components/category_button";

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
                            <CategoryButton category={category}></CategoryButton>
                        );
                    })}
                </p>
            </article>

            {(next || previous) &&
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
                date(formatString: "DD.MM.YYYY")
                description
                categories
            }
        }
    }
`;
