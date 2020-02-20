import React from "react";
import { graphql } from "gatsby";

import Home from "~components/layout/home.js";
import SEO from "~components/seo.js";

export default ({ data }) => {
    const posts = data.posts.edges;

    if (posts.length) {
        return (
            <Home>
                <SEO title="The other food blog" />
                <div className="flex flex-wrap justify-center">
                    We have something to do here...
                </div>
            </Home>
        );
    } else {
        return (
            <Home>
                <SEO title="The other food blog" />
                <div className="text-center">
                    <p>Hier gibt es noch nichts zu sehen... ( •́ ⍨ •̀)</p>
                </div>
            </Home>
        );
    }
}

export const pageQuery = graphql`
    query {
        posts: allMarkdownRemark(
            sort: { fields: frontmatter___date, order: DESC }
            limit: 10
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
                    id
                    excerpt(pruneLength: 160)
                    fields {
                        slug
                    }
                    frontmatter {
                        date(formatString: "YYYY-MM-DD")
                        title
                        description
                        categories
                    }
                }
            }
        }
    }
`;
