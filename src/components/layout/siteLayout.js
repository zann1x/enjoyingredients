import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import styled from "styled-components";

import Navbar from '~components/navbar.js';
import Footer from "~components/footer";

export const SiteLayout = ({children}) => {
    const { site } = useStaticQuery(
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
            <Navbar siteTitle={site.siteMetadata.title}></Navbar>
                {children}
            <Footer></Footer>
        </StyledSiteWrapper>
    );
}

export default SiteLayout;

const StyledSiteWrapper = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
`;