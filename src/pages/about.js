import React from "react";
import { graphql, useStaticQuery } from "gatsby";

import CenteredContent from "~layouts/centeredContent";
import SiteLayout from "~layouts/siteLayout";
import SEO from "~components/seo";

import * as Styled from "./about.styled";

export default ({ location }) => {
    const data = useStaticQuery(graphql`
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
    const content = data.ghostPage;

    return (
        <SiteLayout>
            <SEO
                title={content.title}
                description={content.excerpt}
                pathname={location.pathname} />
            <CenteredContent>
                <Styled.Heading>{content.title}</Styled.Heading>
                <Styled.ContentSection dangerouslySetInnerHTML={{ __html: content.html }}></Styled.ContentSection>
            </CenteredContent>
        </SiteLayout>
    );
}
