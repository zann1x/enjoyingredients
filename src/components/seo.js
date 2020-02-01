/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { useStaticQuery, graphql } from "gatsby";

const SEO = ({ title, description, lang, meta }) => {
    const { site } = useStaticQuery(
        graphql`
            query {
                site {
                    siteMetadata {
                        title
                        description
                        author
                        social {
                            twitter
                        }
                    }
                }
            }
        `
    );

    const metaDescription = description || site.siteMetadata.description;

    return (
        <Helmet
            htmlAttributes={{
                lang,
            }}
            defaultTitle = {site.siteMetadata.title}
            title={title}
            titleTemplate={`%s - ${site.siteMetadata.title}`}
            meta={[
                {
                    name: 'robots',
                    content: 'index, follow'
                },
                {
                    name: `description`,
                    content: metaDescription,
                },
                {
                    name: `author`,
                    content: site.siteMetadata.author,
                },
                {
                    property: `og:title`,
                    content: title,
                },
                {
                    property: `og:description`,
                    content: metaDescription,
                },
                {
                    property: `og:type`,
                    content: `website`,
                },
                {
                    name: `twitter:card`,
                    content: `summary`,
                },
                {
                    name: `twitter:creator`,
                    content: site.siteMetadata.social.twitter,
                },
                {
                    name: `twitter:title`,
                    content: title,
                },
                {
                    name: `twitter:description`,
                    content: metaDescription,
                },
            ].concat(meta)}
        />
    );
}

SEO.defaultProps = {
    title: ``,
    description: ``,
    lang: `de`,
    meta: [],
}

SEO.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    lang: PropTypes.string,
    meta: PropTypes.arrayOf(PropTypes.object),
}

export default SEO;
