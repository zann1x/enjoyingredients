import React from "react"
import { useIntl } from "gatsby-plugin-intl";
import Helmet from "react-helmet";

import CenteredContent from "~layouts/centeredContent";
import SiteLayout from "~layouts/siteLayout";
import config from "~utils/config";
import styled from "styled-components";

export default () => {
    // TODO: detect language
    const intl = useIntl();

    return (
        <SiteLayout>
            <Helmet
                htmlAttributes={'de'}
                title={`404 - ${config.siteTitle}`}
                meta={[
                    {
                        name: 'robots',
                        content: 'noindex, nofollow, noarchive'
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
}

const StyledText = styled.p`
    text-align: center;
    font-size: 1.5rem;
`;
