import React from "react";
import styled from "styled-components";

import theme from "~styles/theme";

export const Footer = () => {
    return (
        <StyledFooter>
            <p>
                © {new Date().getFullYear()} | <a href="https://lukaszanner.de">Mit Hunger gemacht</a>
            </p>
        </StyledFooter>
    );
}

export default Footer;

const StyledFooter = styled.footer`
    font-size: ${theme.fontSize.sm};
    padding: 0.5em 0;
    text-align: center;
`;
