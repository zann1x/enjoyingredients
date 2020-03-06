import React from "react";
import styled from "styled-components";

export const SiteWrapper = ({children}) => {
    return (
        <StyledDiv>
            {children}
        </StyledDiv>
    );
}

export default SiteWrapper;

const StyledDiv = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
`;
