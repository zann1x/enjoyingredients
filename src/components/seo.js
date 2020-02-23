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

const SEO = ({ title, description, lang, meta, pathname, robots }) => {
    const metaDescription = description || config.siteDescription;

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
                    name: 'robots',
                    content: robots
                },
                {
                    name: 'description',
                    content: metaDescription,
                },
                {
                    name: 'author',
                    content: config.creator.name,
                },
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
                    content: `${config.siteUrl}${pathname || '/'}`,
                },
                {
                    name: 'twitter:card',
                    content: 'summary',
                },
                {
                    name: 'twitter:creator',
                    content: config.creator.twitterHandle,
                },
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
    title: '',
    description: '',
    lang: 'de',
    meta: [],
    pathname: '',
    robots: 'index, follow',
}

SEO.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    lang: PropTypes.string,
    meta: PropTypes.arrayOf(PropTypes.object),
    pathname: PropTypes.string,
    robots: PropTypes.string,
}

export default SEO;
