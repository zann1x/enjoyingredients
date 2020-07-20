import React from "react";
import { Link, useIntl } from "gatsby-plugin-intl";
import styled from "styled-components";

import theme from "~styles/theme";

export const Footer = ({ siteTitle }) => {
    const intl = useIntl();
    const made_with_love = intl.formatMessage({ id: "footer_made_with_love" });

    return (
        <StyledFooter>
            <StyledLink to="/">{siteTitle}</StyledLink> - <StyledExtLink href="https://lukaszanner.de">{made_with_love}</StyledExtLink>
        </StyledFooter>
    );
}

export default Footer;

const StyledFooter = styled.footer`
    font-size: ${theme.fontSize.sm};
    padding: 1em 0;
    text-align: center;
`;

const StyledLink = styled(props => <Link {...props} />)`
    &:hover {
        transition-timing-function: cubic-bezier(0.4, 0, 1, 1);
        transition-duration: 200ms;
        color: #4299e1;
    }
`;

const StyledExtLink = styled.a`
    &:hover {
        transition-timing-function: cubic-bezier(0.4, 0, 1, 1);
        transition-duration: 200ms;
        color: #4299e1;
    }
`;
