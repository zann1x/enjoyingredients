import React from "react";
import { Link, useIntl } from "gatsby-plugin-intl";
import styled from "styled-components";

import theme from "~styles/theme";

export const Footer = ({ siteTitle }) => {
    const intl = useIntl();
    const made_with_love = intl.formatMessage({ id: "footer_made_with_love" });

    return (
        <StyledFooter>
            <Link to="/" className="hover:text-blue-500">{siteTitle}</Link> || <a className="hover:text-blue-500" href="https://lukaszanner.de">{made_with_love}</a>
        </StyledFooter>
    );
}

export default Footer;

const StyledFooter = styled.footer`
    font-size: ${theme.fontSize.sm};
    padding: 1em 0;
    text-align: center;
`;
