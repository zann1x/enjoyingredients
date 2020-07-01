import React from "react"
import Helmet from "react-helmet";

import CenteredContent from "~components/layout/centeredContent";
import SiteLayout from "~layouts/siteLayout";
import config from "~utils/config";

export default () => {
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
                <p className="text-center text-2xl">
                    Diese Seite existiert nicht... ( •́ﻩ•̀ )
                </p>
            </CenteredContent>
        </SiteLayout>
    );
}
