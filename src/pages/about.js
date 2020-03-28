import React from "react";
import { graphql } from "gatsby";
import { useIntl } from "gatsby-plugin-intl";
import styled from "styled-components";

import CenteredContent from "~components/layout/centeredContent";
import SiteLayout from "~components/layout/siteLayout";
import SEO from "~components/seo";
import theme from "~styles/theme";

export default ({ data, location }) => {
    const { aboutTranslations } = data;

    // Get the content in the language we are currently visiting the site with
    const intl = useIntl();
    const content = aboutTranslations.nodes.filter(page => intl.locale === page.frontmatter.language)[0];

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
        aboutTranslations: allMarkdownRemark(
            filter: {
                fields: {
                    slug: {
                        regex: "//about//"
                    }
                }
            }) {
            nodes {
                fields {
                    slug
                }
                frontmatter {
                    title
                    description
                    language
                }
                html
            }
        }
    }
`;

const StyledHeading = styled.h1`
    font-size: ${theme.fontSize.h1};
    font-weight: ${theme.fontWeight.f700};

    padding-bottom: 0.5rem;
`;
