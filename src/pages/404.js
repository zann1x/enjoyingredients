import React from "react"
import Helmet from "react-helmet";

import config from "~utils/config";
import CenteredContent from "~components/layout/centeredContent";

export default () => {
    const lang = 'de';

    return (
        <>
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
                <p className="text-center">
                    Diese Seite existiert nicht... ( •́ﻩ•̀ )
                </p>
            </CenteredContent>
        </>
    );
}
