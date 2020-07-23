import React from "react";
import { useIntl } from "gatsby-plugin-intl";
import styled from "styled-components";

import theme from "~styles/theme";

export const Footer = () => {
    const intl = useIntl();
    const made_with_love = intl.formatMessage({ id: "footer_made_with_love" });

    return (
        <StyledFooter>
            <StyledExtLink href="https://lukaszanner.de" target="_blank">{made_with_love}</StyledExtLink>
        </StyledFooter>
    );
}

export default Footer;

const StyledFooter = styled.footer`
    font-size: ${theme.fontSize.sm};
    padding: 1em 0;
    text-align: center;
`;

const StyledExtLink = styled.a`
    &:hover {
        transition-timing-function: cubic-bezier(0.4, 0, 1, 1);
        transition-duration: 200ms;
        color: #4299e1;
    }
`;
