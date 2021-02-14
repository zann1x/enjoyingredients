import React, { useEffect } from 'react';
import { useIntl } from 'gatsby-plugin-intl';
import Helmet from 'react-helmet';
import styled from 'styled-components';

import CenteredContent from '~/layouts/centeredContent';
import SiteLayout from '~/layouts/siteLayout';
import config from '~/utils/config';

const NotFound: React.FC = () => {
    // TODO: detect language
    const intl = useIntl();

    useEffect(() => {
        if (window.plausible) {
            window.plausible("404", { props: { path: document.location.pathname } });
        }
    });

    return (
        <SiteLayout>
            <Helmet
                title={`404 - ${config.siteTitle}`}
                meta={[
                    {
                        name: 'robots',
                        content: 'noindex, nofollow, noarchive',
                    },
                ]}
            />
            <CenteredContent>
                <StyledText>
                    {intl.formatMessage({ id: '404_not_found' })}
                </StyledText>
            </CenteredContent>
        </SiteLayout>
    );
};

export default NotFound;

const StyledText = styled.p`
    text-align: center;
    font-size: 1.5rem;
`;
