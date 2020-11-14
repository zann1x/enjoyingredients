const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');
const {
    createPathFromSlug,
    EUrlType,
} = require('./src/utils/createPathFromSlug');

exports.createPages = async ({ actions, graphql }) => {
    const { createPage } = actions;
    const blogPostTemplate = path.resolve(`./src/templates/blogPost.js`);
    const pageTemplate = path.resolve(`./src/templates/page.js`);

    const result = await graphql(`
        {
            posts: allGhostPost(
                filter: { slug: { ne: "data-schema" } }
                sort: { order: DESC, fields: [published_at] }
            ) {
                nodes {
                    slug
                }
            }
            tags: allGhostTag(filter: { slug: { ne: "data-schema" } }) {
                nodes {
                    slug
                }
            }
            pages: allGhostPage(filter: { slug: { ne: "data-schema-page" } }) {
                nodes {
                    slug
                }
            }
        }
    `);

    if (result.errors) {
        throw result.errors;
    }

    // TODO: filter out pages for paths not fitting to the language of the site
    //       (e.g. pages with tag #de should not appear under .com/en/)

    // Create blog posts pages
    const { posts } = result.data;
    if (posts && Array.isArray(posts.nodes) && posts.nodes.length) {
        posts.nodes.forEach((post) => {
            createPage({
                path: createPathFromSlug(EUrlType.BLOG_POST, post.slug),
                component: blogPostTemplate,
                context: {
                    slug: post.slug,
                },
            });
        });
    }

    // Create category page
    const { tags } = result.data;
    // if (tags) {
    //     createPage({
    //         path: createPathFromSlug(EUrlType.BLOG_CATEGORY, ''),
    //         component: blogCategoriesTemplate
    //     });
    // }

    // Create individual pages (e.g. /about)
    const { pages } = result.data;
    if (pages && Array.isArray(pages.nodes) && pages.nodes.length) {
        pages.nodes.forEach((page) => {
            createPage({
                path: createPathFromSlug(EUrlType.PAGE, page.slug),
                component: pageTemplate,
                context: {
                    slug: page.slug,
                },
            });
        });
    }
};

exports.onCreateNode = ({ node, actions, getNode }) => {
    const { createNodeField } = actions;

    if (node.internal.type === `MarkdownRemark`) {
        const slug = createFilePath({ node, getNode });
        createNodeField({
            node,
            name: `slug`,
            value: slug,
        });
    }
};

// Give the src folders an alias for prettier imports
exports.onCreateWebpackConfig = ({ actions }) => {
    actions.setWebpackConfig({
        resolve: {
            alias: {
                '~content': path.resolve(__dirname, 'content'),

                '~components': path.resolve(__dirname, 'src/components'),
                '~layouts': path.resolve(__dirname, 'src/layouts'),
                '~pages': path.resolve(__dirname, 'src/pages'),
                '~styles': path.resolve(__dirname, 'src/styles'),
                '~templates': path.resolve(__dirname, 'src/templates'),
                '~utils': path.resolve(__dirname, 'src/utils'),
            },
        },
    });
};
