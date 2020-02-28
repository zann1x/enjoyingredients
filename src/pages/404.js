import React from "react"

import Home from "~components/layout/home.js";
import Helmet from "react-helmet";
import config from "~utils/config";

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
            <Home>
                <p className="text-center">
                    Diese Seite existiert nicht... ( •́ﻩ•̀ )
                </p>
            </Home>
        </>
    );
}
