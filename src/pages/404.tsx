import React from 'react';
import { useIntl } from 'gatsby-plugin-intl';
import Helmet from 'react-helmet';

import CenteredContent from '~layouts/centeredContent';
import SiteLayout from '~layouts/siteLayout';
import config from '~utils/config';
import styled from 'styled-components';

const NotFound: React.FC = () => {
    // TODO: detect language
    const intl = useIntl();

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