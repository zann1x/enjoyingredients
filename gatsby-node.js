const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');
const { createPathFromSlug, EUrlType } = require("./src/utils/createPathFromSlug");

exports.createPages = async ({ actions, graphql }) => {
    const { createPage } = actions;
    const blogPost = path.resolve(`./src/templates/blogPost.js`);

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
                '~content': path.resolve(__dirname, 'content'),

                '~components': path.resolve(__dirname, 'src/components'),
                '~layouts': path.resolve(__dirname, 'src/layouts'),
                '~pages': path.resolve(__dirname, 'src/pages'),
                '~styles': path.resolve(__dirname, 'src/styles'),
                '~templates': path.resolve(__dirname, 'src/templates'),
                '~utils': path.resolve(__dirname, 'src/utils'),
            },
        },
    })
}
