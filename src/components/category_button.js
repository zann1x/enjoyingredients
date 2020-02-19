import React from "react";
import { graphql, Link, useStaticQuery } from "gatsby";

const CategoryButton = ({ category }) => {
    const { allCategories } = useStaticQuery(
        graphql`
            query {
                allCategories: allMarkdownRemark(
                    filter: {
                        fields: {
                            slug: { regex: "/category/" }
                        }
                    }
                ) {
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

    const categoryItem = allCategories.edges.find(element => element.node.frontmatter.title === category, category);
    const categorySlug = categoryItem.node.fields.slug;

    return (
        <Link to={`${categorySlug}`} className="inline-block rounded-full px-3 py-1 mx-1 text-sm font-semibold text-gray-700 bg-gray-100">
            {category}
        </Link>
    );
}

export default CategoryButton;
