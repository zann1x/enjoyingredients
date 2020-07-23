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
            }
        `
    );

    return (
        <StyledSiteWrapper>
            <Navbar siteTitle={data.site.siteMetadata.title} />
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
