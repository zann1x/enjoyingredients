import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import config from '~/config';
import { EUrlType } from '~/utils/createPathFromSlug';

interface SEOProps {
    title: string;
    description: string;
    canonical?: string;
    robots?: string;
}

const getBaseURLForLocale = (locale) => {
    if (process.env.NODE_ENV === 'development') {
        return 'http://localhost:8000';
    }

    switch (locale) {
        case 'de':
            return 'https://www.enjoyingredients.de';
        default:
            return 'https://www.enjoyingredients.com';
    }
};

const SEO = ({
    title,
    description,
    canonical,
    robots = 'index, follow',
}: SEOProps) => {
    const router = useRouter();
    const pathname = router.asPath;

    if (description.length > 230) {
        description = description.substr(0, 230).concat('...');
    }

    canonical = canonical
        ? canonical
        : `${getBaseURLForLocale(router.locale)}${
              pathname !== EUrlType.STARTPAGE ? pathname : ''
          }`;

    // TODO: potentially add hreflang
    return (
        <Head>
            <title>{`${title} - ${config.siteTitle}`}</title>
            <meta name="description" content={description} />
            <meta name="robots" content={robots} />
            <meta name="canonical" content={canonical} />
            <meta name="og:title" content={title} />
            <meta name="og:site_name" content={config.siteTitle} />
            <meta name="og:description" content={description} />
            <meta name="og:type" content="website" />
            <meta name="og:url" content={canonical} />
            <meta name="twitter:card" content="summary" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
        </Head>
    );
};

export default SEO;
