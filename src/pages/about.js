import React from "react";
import { graphql } from "gatsby";

import Home from "~components/layout/home.js";
import SEO from "~components/seo.js";

export default ({ data, location }) => {
    const { content } = data;

    return (
        <Home>
            <SEO
                title={content.frontmatter.title}
                description={'Über mich'}
                pathname={location.pathname} />
            <div>
                <h1 className="text-3xl font-bold pb-2">{content.frontmatter.title}</h1>
                <section className="leading-relaxed text-justify" dangerouslySetInnerHTML={{ __html: content.html }}></section>
            </div>
        </Home>
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
