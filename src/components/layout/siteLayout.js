import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import styled from "styled-components";

import Footer from "~components/footer";
import Navbar from "~components/navbar";

export const SiteLayout = ({children}) => {
    const data = useStaticQuery(
        graphql`
            query {
                site {
                    siteMetadata {
                        title
                    }
                }
                file(relativePath: {eq: "logo.png"}) {
                    childImageSharp {
                        fixed(width: 200) {
                            ...GatsbyImageSharpFixed
                        }
                    }
                }
            }
        `
    );

    return (
        <StyledSiteWrapper>
            <Navbar siteTitle={data.site.siteMetadata.title} logo={data.file} />
                {children}
            <Footer />
        </StyledSiteWrapper>
    );
}

export default SiteLayout;

const StyledSiteWrapper = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
`;
