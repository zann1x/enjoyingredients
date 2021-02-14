/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */
import React from 'react';
import Helmet from 'react-helmet';

const config = require('~/utils/config');

interface SEOProps {
    title: string;
    description: string;
    lang?: string;
    meta?;
    canonical?: string;
    pathname: string;
    robots?: string;
}

const SEO: React.FC<SEOProps> = ({
    title,
    description,
    lang = 'de',
    meta = [],
    canonical,
    pathname,
    robots = 'index, follow',
}) => {
    let metaDescription: string = description;
    if (description.length > 230) {
        metaDescription = metaDescription.substr(0, 230).concat('...');
    }

    canonical = canonical ? canonical : `${config.siteUrl}${pathname}`;

    // TODO: potentially add hreflang
    // TODO: detect lang
    return (
        <Helmet
            htmlAttributes={{
                lang,
            }}
            defaultTitle={config.siteTitle}
            title={title}
            titleTemplate={`%s - ${config.siteTitle}`}
            meta={[
                {
                    name: 'canonical',
                    content: canonical,
                },
                {
                    name: 'robots',
                    content: robots,
                },
                {
                    name: 'description',
                    content: metaDescription,
                },
                // {
                //     name: 'author',
                //     content: config.creator.name,
                // },
                {
                    property: 'og:title',
                    content: title,
                },
                {
                    property: 'og:description',
                    content: metaDescription,
                },
                {
                    property: 'og:type',
                    content: 'website',
                },
                {
                    property: 'og:url',
                    content: canonical,
                },
                {
                    name: 'twitter:card',
                    content: 'summary',
                },
                // {
                //     name: 'twitter:creator',
                //     content: config.creator.twitterHandle,
                // },
                {
                    name: 'twitter:title',
                    content: title,
                },
                {
                    name: 'twitter:description',
                    content: metaDescription,
                },
            ].concat(meta)}
        ></Helmet>
    );
};

export default SEO;
