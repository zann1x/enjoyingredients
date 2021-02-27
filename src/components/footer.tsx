import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'next-i18next';

const Footer = () => {
    const { t } = useTranslation('common');
    const made_with_love: string = t('footer_made_with_love');

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
    font-size: ${({ theme }) => theme.fontSize.sm};
    padding: 1em 0;
    text-align: center;
`;

const StyledExtLink = styled.a`
    &:hover {
        color: #4299e1;
    }
`;
