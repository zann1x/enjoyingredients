import React from "react";
import { graphql } from "gatsby";

import Layout from "~components/layout.js";
import SEO from "~components/seo.js";

export default ({ data }) => {
    const { content } = data;

    return (
        <Layout>
            <SEO title={content.frontmatter.title} />
            <div>
                <h1 className="text-3xl font-bold">{content.frontmatter.title}</h1>
                <section dangerouslySetInnerHTML={{ __html: content.html }}></section>
            </div>
        </Layout>
    );
}

export const pageQuery = graphql`
    query {
        content: markdownRemark(
            fields: {
                slug: {
                    eq: "/about/"
                }
            }) {
            id
            frontmatter {
                title
            }
            html
        }
    }
`;
