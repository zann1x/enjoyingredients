import React from "react";
import { useIntl } from "gatsby-plugin-intl";
import styled from "styled-components";

import theme from "~styles/theme";

export const Footer = () => {
    const intl = useIntl();

    return (
        <StyledFooter>
            <p>
                © {new Date().getFullYear()} | <a href="https://lukaszanner.de">{intl.formatMessage({ id: "footer_made_with_hunger" })}</a>
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
