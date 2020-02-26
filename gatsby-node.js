const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');

exports.createPages = async ({ actions, graphql }) => {
    const { createPage } = actions;
    const blogPost = path.resolve(`./src/templates/blog_post.js`);
    const blogCategory = path.resolve(`./src/templates/blog_category.js`);

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

            categories: allMarkdownRemark(
                filter: {
                    fields: {
                        slug: {
                            regex: "/category/"
                            ne: "/category/dummy/"
                        }
                    }
                }) {
                edges {
                    node {
                        fields {
                            slug
                        }
                        frontmatter {
                            title
                        }
                    }
                }
            }
        }
    `);

    if (result.errors) {
        throw result.errors;
    }

    // Create blog posts pages
    if (result.data.posts) {
        const posts = result.data.posts;
        posts.edges.forEach(({ node }) => {
            createPage({
                path: `/blog/${node.slug}`,
                component: blogPost,
                context: {
                    slug: node.slug,
                },
            });
        });
    }

    // Create category pages
    const categories = result.data.categories.edges;
    categories.forEach((category) => {
        const slug = category.node.fields.slug;
        const title = category.node.frontmatter.title;
        createPage({
            path: slug,
            component: blogCategory,
            context: {
                slug: slug,
                title: title,
            },
        });
    });
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
