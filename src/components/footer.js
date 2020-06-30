import React from "react";
import { useIntl } from "gatsby-plugin-intl";
import styled from "styled-components";

import theme from "~styles/theme";

export const Footer = ({ siteTitle }) => {
    const intl = useIntl();

    return (
        <StyledFooter>
            {siteTitle} | <a className="hover:text-indigo-800" href="https://lukaszanner.de">{intl.formatMessage({ id: "footer_made_with_hunger" })}</a>
        </StyledFooter>
    );
}

export default Footer;

const StyledFooter = styled.footer`
    font-size: ${theme.fontSize.sm};
    padding: 0.5em 0;
    text-align: center;
`;
