/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";

const config = require('~utils/config');

const SEO = ({ title, description, lang, meta, canonical, pathname, robots }) => {
    let metaDescription = description;
    if (description.length > 170) {
        metaDescription = metaDescription.substr(0, 160).concat('...');
    }
    
    canonical = canonical ? canonical : `${config.siteUrl}${pathname}`;

    return (
        <Helmet
            htmlAttributes={{
                lang,
            }}
            defaultTitle = {config.siteTitle}
            title={title}
            titleTemplate={`%s - ${config.siteTitle}`}
            meta={[
                {
                    name: 'canonical',
                    content: canonical
                },
                {
                    name: 'robots',
                    content: robots
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
        />
    );
}

SEO.defaultProps = {
    lang: 'de',
    meta: [],
    robots: 'index, follow',
}

SEO.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    lang: PropTypes.string,
    meta: PropTypes.arrayOf(PropTypes.object),
    canonical: PropTypes.string,
    pathname: PropTypes.string.isRequired,
    robots: PropTypes.string,
}

export default SEO;
