import React from 'react';
import { IntlShape, useIntl } from 'gatsby-plugin-intl';
import styled from 'styled-components';

const ContentFooter: React.FC = () => {
    const intl: IntlShape = useIntl();
    const contact_us: string = intl.formatMessage({
        id: 'contact_us_via_mail',
    });

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
        transition-timing-function: cubic-bezier(0.4, 0, 1, 1);
        transition-duration: 200ms;
        color: #4299e1;
    }
`;