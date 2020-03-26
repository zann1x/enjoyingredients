import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import styled from "styled-components";

import Footer from "~components/footer";
import Navbar from "~components/navbar";

export const CenteredContent = ({children}) => {
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
            <div className="container mx-auto flex-grow px-2 py-4 w-11/12 sm:w-10/12 md:w-8/12 lg:w-7/12 xl:w-6/12">
                {children}
            </div>
            <Footer></Footer>
        </StyledSiteWrapper>
    );
}

export default CenteredContent;

const StyledSiteWrapper = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
`;
