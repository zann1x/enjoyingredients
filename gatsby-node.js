const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');
// const replacePath = path => (path === `/` ? path : path.replace(/\/$/, ''));

exports.createPages = async ({ actions, graphql }) => {
    const { createPage } = actions;
    const blogPost = path.resolve(`./src/templates/blog_post.js`);
    const blogCategory = path.resolve(`./src/templates/blog_category.js`);

    const result = await graphql(`
        {
            posts: allMarkdownRemark(
                sort: {
                    fields: frontmatter___date
                    order: DESC
                }
                limit: 2000
                filter: {
                    fields: {
                        slug: {
                            regex: "/posts/"
                            ne: "/posts/dummy/"
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
    const posts = result.data.posts;
    posts.edges.forEach((post, index) => {
        // As the posts are ordered descending by creation time, the previous post is always the older one
        const previous = index === posts.edges.length - 1 ? null : posts.edges[index + 1].node;
        const next = index === 0 ? null : posts.edges[index - 1].node;

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

// TODO
// Implement the Gatsby API “onCreatePage”. This is called after every page is created.
// exports.onCreatePage = ({ page, actions }) => {
//     const { createPage, deletePage } = actions;
//     const oldPage = Object.assign({}, page);
    
//     // Remove trailing slash unless page is /
//     page.path = replacePath(page.path);
//     if (page.path !== oldPage.path) {
//         // Replace new page with old page
//         deletePage(oldPage);
//         createPage(page);
//     }
// }

// Give the src folders an alias for prettier imports
exports.onCreateWebpackConfig = ({ actions }) => {
    actions.setWebpackConfig({
        resolve: {
            alias: {
                '~components': path.resolve(__dirname, 'src/components'),
                '~css': path.resolve(__dirname, 'src/css'),
                '~pages': path.resolve(__dirname, 'src/pages'),
                '~templates': path.resolve(__dirname, 'src/templates'),
                '~utils': path.resolve(__dirname, 'src/utils'),
            },
        },
    })
}
