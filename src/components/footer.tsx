import React from 'react';
import { IntlShape, useIntl } from 'gatsby-plugin-intl';
import styled from 'styled-components';

import theme from '~/styles/theme';

const Footer = () => {
    const intl: IntlShape = useIntl();
    const made_with_love: string = intl.formatMessage({
        id: 'footer_made_with_love',
    });

    return (
        <StyledFooter>
            <StyledExtLink
                href="https://lukaszanner.de"
                target="_blank"
                rel="noopener"
            >
                {made_with_love}
            </StyledExtLink>
        </StyledFooter>
    );
};

export default Footer;

const StyledFooter = styled.footer`
    font-size: ${theme.fontSize.sm};
    padding: 1em 0;
    text-align: center;
`;

const StyledExtLink = styled.a`
    &:hover {
        color: #4299e1;
    }
`;
