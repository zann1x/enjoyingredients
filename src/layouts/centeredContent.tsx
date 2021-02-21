import React from 'react';
import styled from 'styled-components';

interface CenteredContentProps {
    children: any;
}

const CenteredContent = ({ children }: CenteredContentProps) => {
    return <StyledContainer>{children}</StyledContainer>;
};

export default CenteredContent;

const StyledContainer = styled.div`
    width: 91.666667%;
    @media (min-width: 640px) {
        width: 83.333333%;
        max-width: 640px;
    }
    @media (min-width: 768px) {
        width: 66.666667%;
        max-width: 768px;
    }
    @media (min-width: 1024px) {
        width: 58.333333%;
        max-width: 1024px;
    }
    @media (min-width: 1280px) {
        width: 50%;
        max-width: 1280px;
    }

    margin-right: auto;
    margin-left: auto;
    padding: 1rem 0.5rem;
    flex-grow: 1;
`;
