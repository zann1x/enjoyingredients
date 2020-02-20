import React from "react"

import Home from "~components/layout/home.js";
import SEO from "~components/seo.js";

export default () => {
    return (
        <Home>
            <SEO
                title="404 Not Found"
                robots="noindex, nofollow, noarchive"
            />
            <p className="text-center">
                Diese Seite existiert nicht... ( •́ﻩ•̀ )
            </p>
        </Home>
    );
}
