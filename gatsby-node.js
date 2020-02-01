const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');

exports.createPages = async ({ actions, graphql }) => {
    const { createPage } = actions;
    const blogPost = path.resolve(`./src/templates/blog_post.js`);
    const result = await graphql(
        `
            {
                allMarkdownRemark(
                    sort: {
                        fields: frontmatter___date
                        order: DESC
                    }
                    limit: 20
                    filter: {
                        frontmatter: {
                            title: {
                                ne: "post-nr-sse-tintsh-11-e"
                            }
                        }
                        fields: {
                            slug: {
                                regex: "/posts/"
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
        `
    );

    if (result.errors) {
        throw result.errors;
    }

    // Create blog posts pages
    const posts = result.data.allMarkdownRemark.edges;
    posts.forEach((post, index) => {
        const previous = index === posts.length - 1 ? null : posts[index + 1].node;
        const next = index === 0 ? null : posts[index - 1].node;

        const slug = post.node.fields.slug;
        createPage({
            path: slug,
            component: blogPost,
            context: {
                slug: slug,
                previous,
                next,
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
                '~config': path.resolve(__dirname, 'src/config'),
                '~css': path.resolve(__dirname, 'src/css'),
                '~pages': path.resolve(__dirname, 'src/pages'),
                '~templates': path.resolve(__dirname, 'src/templates'),
            },
        },
    })
}
