const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.createPages = async ({ actions, graphql }) => {
    const { createPage } = actions;
    const blogPost = path.resolve(`./src/templates/blog_post.js`);
    const result = await graphql(
        `
            {
                allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }, limit: 20) {
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
        // Always substract one element more to compensate the dummy post
        const previous = index === posts.length - 2 || posts.length === 1 ? null : posts[index + 1].node;
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
