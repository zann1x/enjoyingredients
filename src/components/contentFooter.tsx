import React from 'react';
import { useTranslation } from 'next-i18next';
import styled from 'styled-components';

const ContentFooter = () => {
    const { t } = useTranslation('common');
    const contact_us: string = t('contact_us_via_mail');

    return (
        <>
            <span>{contact_us}</span>
            <StyledExtLink href="mailto:mail@enjoyingredients.com">
                mail@enjoyingredients.com
            </StyledExtLink>
        </>
    );
};

export default ContentFooter;

const StyledExtLink = styled.a`
    text-decoration: underline;
    &:hover {
        color: #4299e1;
    }
`;
