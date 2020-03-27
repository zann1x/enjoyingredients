import React from "react";
import { graphql } from "gatsby";

import CenteredContent from "~components/layout/centeredContent";
import SiteLayout from "~components/layout/siteLayout";
import SEO from "~components/seo";

export default ({ data, location }) => {
    const { content } = data;

    return (
        <SiteLayout>
            <SEO
                title={content.frontmatter.title}
                description={content.frontmatter.description}
                pathname={location.pathname} />
            <CenteredContent>
                <div>
                    <h1 className="text-3xl font-bold pb-2">{content.frontmatter.title}</h1>
                    <section className="leading-relaxed text-justify" dangerouslySetInnerHTML={{ __html: content.html }}></section>
                </div>
            </CenteredContent>
        </SiteLayout>
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
                description
            }
            html
        }
    }
`;
