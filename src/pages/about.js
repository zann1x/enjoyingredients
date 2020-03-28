import React from "react";
import { graphql } from "gatsby";
import styled from "styled-components";

import CenteredContent from "~components/layout/centeredContent";
import SiteLayout from "~components/layout/siteLayout";
import SEO from "~components/seo";
import theme from "~styles/theme";

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
                    <StyledHeading>{content.frontmatter.title}</StyledHeading>
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

const StyledHeading = styled.h1`
    font-size: ${theme.fontSize.h1};
    font-weight: ${theme.fontWeight.f700};

    padding-bottom: 0.5rem;
`;
