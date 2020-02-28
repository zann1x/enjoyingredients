const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');
const { createPathFromSlug, EUrlType } = require("./src/utils/createLinkFromSlug");

exports.createPages = async ({ actions, graphql }) => {
    const { createPage } = actions;
    const blogPost = path.resolve(`./src/templates/blogPost.js`);
    const blogCategory = path.resolve(`./src/templates/blogCategory.js`);

    const result = await graphql(`
        {
            posts: allGhostPost(
                sort: {
                    order: DESC,
                    fields: [published_at]
                }
                ) {
                edges {
                    node {
                        slug
                    }
                }
            }

            categories: allGhostTag {
                nodes {
                    slug
                }
            }
        }
    `);

    if (result.errors) {
        throw result.errors;
    }

    // Create blog posts pages
    const { posts } = result.data;
    if (posts) {
        posts.edges.forEach(({ node }) => {
            createPage({
                path: createPathFromSlug(EUrlType.BLOG_POST, node.slug),
                component: blogPost,
                context: {
                    slug: node.slug,
                },
            });
        });
    }

    // Create category pages
    const { categories } = result.data;
    if (categories) {
        categories.nodes.forEach((category) => {
            createPage({
                path: createPathFromSlug(EUrlType.BLOG_CATEGORY, category.slug),
                component: blogCategory,
                context: {
                    slug: category.slug,
                },
            });
        });
    }
}

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
}

// Give the src folders an alias for prettier imports
exports.onCreateWebpackConfig = ({ actions }) => {
    actions.setWebpackConfig({
        resolve: {
            alias: {
                '~components': path.resolve(__dirname, 'src/components'),
                '~styles': path.resolve(__dirname, 'src/styles'),
                '~pages': path.resolve(__dirname, 'src/pages'),
                '~templates': path.resolve(__dirname, 'src/templates'),
                '~utils': path.resolve(__dirname, 'src/utils'),
            },
        },
    })
}
