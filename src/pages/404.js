import React from "react"

import Layout from "~components/layout";
import SEO from "~components/seo";

export default () => {
    return (
        <Layout>
            <SEO title="404 Not Found" />
            <p className="text-center">
                Diese Seite existiert nicht... ( •́ﻩ•̀ )
            </p>
        </Layout>
    );
}
