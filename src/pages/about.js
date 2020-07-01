import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import styled from "styled-components";

import CenteredContent from "~components/layout/centeredContent";
import SiteLayout from "~components/layout/siteLayout";
import SEO from "~components/seo";
import theme from "~styles/theme";

export default ({ location }) => {
    const qdata = useStaticQuery(graphql`
        query {
            ghostPage(
                slug: { eq: "ueber-mich" },
                # tags: { elemMatch: { slug: { eq: $tagslug } } }
            ) {
                title
                excerpt
                slug
                html
                tags { slug }
            }
        }
    `);

    // const { aboutTranslations } = data;

    // Get the content in the language we are currently visiting the site with
    // const intl = useIntl();
    // const content = aboutTranslations.nodes.filter(page => intl.locale === page.frontmatter.language)[0];
    const content = qdata.ghostPage;

    return (
        <SiteLayout>
            <SEO
                title={content.title}
                description={content.excerpt}
                pathname={location.pathname} />
            <CenteredContent>
                <StyledHeading>{content.title}</StyledHeading>
                <StyledContentSection dangerouslySetInnerHTML={{ __html: content.html }}></StyledContentSection>
            </CenteredContent>
        </SiteLayout>
    );
}

const StyledHeading = styled.h1`
    font-size: ${theme.fontSize.h1};
    font-weight: ${theme.fontWeight.f700};

    padding-bottom: 0.5rem;
`;

const StyledContentSection = styled.section`
    line-height: 1.625;
    text-align: justify;

    p {
        margin: 0.5rem 0;
    }
`;
