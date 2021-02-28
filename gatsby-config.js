const config = require('./src/utils/config');
const path = require(`path`);

let ghostConfig;

try {
    ghostConfig = require(`./.ghost`);
} catch (e) {
    ghostConfig = {
        production: {
            apiUrl: process.env.GHOST_API_URL,
            contentApiKey: process.env.GHOST_CONTENT_API_KEY,
        },
    };
} finally {
    const { apiUrl, contentApiKey } =
        process.env.NODE_ENV === 'development'
            ? ghostConfig.development
            : ghostConfig.production;

    if (!apiUrl || !contentApiKey || contentApiKey.match(/<key>/)) {
        throw new Error(
            'GHOST_API_URL and GHOST_CONTENT_API_KEY are required to build.',
        ); // eslint-disable-line
    }
}

module.exports = {
    siteMetadata: {
        title: config.siteTitle,
        description: config.siteDescription,
        siteUrl: config.siteUrl,
    },
    plugins: [
        `gatsby-plugin-catch-links`,
        `gatsby-plugin-force-trailing-slashes`,
        'gatsby-plugin-plausible',
        'gatsby-plugin-react-helmet',
        'gatsby-plugin-sharp',
        'gatsby-plugin-styled-components',
        'gatsby-transformer-sharp',
        {
            resolve: `gatsby-plugin-ghost-images`,
            options: {
                // An array of node types and image fields per node
                // Image fields must contain a valid absolute path to the image to be downloaded
                lookup: [
                    {
                        type: `GhostPost`,
                        imgTags: [`feature_image`],
                    },
                    {
                        type: `GhostPage`,
                        imgTags: [`feature_image`],
                    },
                    {
                        type: `GhostSettings`,
                        imgTags: [`cover_image`],
                    },
                ],
                // Additional condition to exclude nodes
                // Takes precedence over lookup
                exclude: (node) => node.ghostId === undefined,
                // Additional information messages useful for debugging
                verbose: true,
                // Option to disable the module (default: false)
                disable: false,
            },
        },
        {
            resolve: `gatsby-plugin-intl`,
            options: {
                // language JSON resource path
                path: `${__dirname}/src/i18n`,
                // supported languages
                languages: [`de`],
                // language file path
                defaultLanguage: `de`,
                // option to redirect to browser prefered language when connecting `/`
                redirect: true,
            },
        },
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                path: path.join(__dirname, `content`, `pages`),
                name: 'pages',
            },
        },
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                path: path.join(__dirname, `content`, `img`),
                name: 'img',
            },
        },
        {
            resolve: 'gatsby-transformer-remark',
            options: {
                plugins: [
                    'gatsby-remark-copy-linked-files',
                    'gatsby-remark-smartypants',
                    {
                        resolve: 'gatsby-remark-external-links',
                        options: {
                            target: '_blank',
                            rel: 'nofollow noopener noreferrer',
                        },
                    },
                    {
                        resolve: 'gatsby-remark-images',
                        options: {
                            maxWidth: 590,
                        },
                    },
                    {
                        resolve: 'gatsby-remark-responsive-iframe',
                        options: {
                            wrapperStyle: 'margin-bottom: 1.0725rem',
                        },
                    },
                ],
            },
        },
        {
            resolve: `jamify-source-ghost`,
            options: {
                ghostConfig:
                    process.env.NODE_ENV === `development`
                        ? ghostConfig.development
                        : ghostConfig.production,
                // Use cache (default: true)
                cacheResponse: true,
                // Show info message (default: true)
                verbose: false,
            },
        },
    ],
};
