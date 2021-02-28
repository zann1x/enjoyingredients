import React, { ReactNode } from 'react';
import styled from 'styled-components';

import Footer from '~/components/footer';
import Navbar from '~/components/navbar';

interface SiteLayoutProps {
    children: ReactNode | ReactNode[];
}

const SiteLayout = ({ children }: SiteLayoutProps) => {
    return (
        <StyledSiteWrapper>
            <Navbar />
            {children}
            <Footer />
        </StyledSiteWrapper>
    );
};

export default SiteLayout;

const StyledSiteWrapper = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
`;
