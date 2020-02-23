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
    }
} finally {
    const { apiUrl, contentApiKey } = process.env.NODE_ENV === `development` ? ghostConfig.development : ghostConfig.production

    if (!apiUrl || !contentApiKey || contentApiKey.match(/<key>/)) {
        throw new Error(`GHOST_API_URL and GHOST_CONTENT_API_KEY are required to build. Check the README.`) // eslint-disable-line
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
        'gatsby-plugin-postcss',
        'gatsby-plugin-react-helmet',
        'gatsby-plugin-sharp',
        'gatsby-transformer-sharp',
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
                path: path.join(__dirname, `content`, `blog`),
                name: 'blog',
            },
        },
        // {
        //     resolve: 'gatsby-source-filesystem',
        //     options: {
        //         path: path.join(__dirname, `content`, `assets`)
        //         name: 'assets',
        //     },
        // },
        {
            resolve: `gatsby-source-ghost`,
            options:
                process.env.NODE_ENV === `development`
                    ? ghostConfig.development
                    : ghostConfig.production,
        },
        {
            resolve: 'gatsby-transformer-remark',
            options: {
                plugins: [
                    'gatsby-remark-copy-linked-files',
                    'gatsby-remark-smartypants',
                    {
                        resolve: "gatsby-remark-external-links",
                        options: {
                          target: "_blank",
                          rel: "nofollow noopener noreferrer"
                        }
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
        // {
        //     resolve: 'gatsby-plugin-manifest',
        //     options: {
        //         name: 'EnjoyIngredients - the other food blog',
        //         short_name: 'EnjoyIngredients',
        //         start_url: '/',
        //         background_color: '#ffffff',
        //         theme_color: '#663399',
        //         display: 'minimal-ui',
        //         icon: `content/assets/gatsby-icon.png`,
        //     },
        // },
        // this (optional) plugin enables Progressive Web App + Offline functionality
        // To learn more, visit: https://gatsby.dev/offline
        // 'gatsby-plugin-offline',
    ],
}
