import React from "react"
import Helmet from "react-helmet";

import CenteredContent from "~layouts/centeredContent";
import SiteLayout from "~layouts/siteLayout";
import config from "~utils/config";
import styled from "styled-components";

export default () => {
    // TODO: detect language
    const lang = 'de';

    return (
        <SiteLayout>
            <Helmet
                htmlAttributes={{lang}}
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
                    Diese Seite existiert nicht... ( •́ﻩ•̀ )
                </StyledText>
            </CenteredContent>
        </SiteLayout>
    );
}

const StyledText = styled.p`
    text-align: center;
    font-size: 1.5rem;
`;
