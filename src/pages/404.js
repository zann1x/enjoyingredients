import React from "react"

import Layout from "../components/layout";
import SEO from "../components/seo";

export default () => {
    return (
        <Layout>
            <SEO title="404: Not Found" />
            <h1>404</h1>
            <p>
                Diese Seite existiert nicht... ( •́ﻩ•̀ )
            </p>
        </Layout>
    );
}
