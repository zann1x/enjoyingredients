import React from "react";
import { graphql } from "gatsby";

import Content from "~components/layout/content";
import PostTeaserCard from "~components/postTeaserCard";
import SEO from "~components/seo";
import PropTypes from "prop-types";

const BlogCategory =  ({ data: { category, postsInCategory} }) => {
    return (
        <Content>
            <SEO/>
            <div className="flex flex-wrap justify-center">
                <h1>{category.name}</h1>

                {postsInCategory.nodes.map((post) => {
                    return (
                        <div key={post.id} className="max-w-lg m-3">
                            <PostTeaserCard
                                slug={post.slug}
                                title={post.title}
                                description={post.custom_excerpt || post.excerpt}
                                categories={post.tags}
                            ></PostTeaserCard>
                        </div>
                    );
                })}
            </div>
        </Content>
    );
}

BlogCategory.propTypes = {
    category: PropTypes.object,
    postsInCategory: PropTypes.arrayOf(PropTypes.object),
};

export default BlogCategory;

export const pageQuery = graphql`
    query ($slug: String!) {
        category: ghostTag(
            slug: { eq: $slug },
            postCount: { gt: 0 }
        ) {
            name
        }

        postsInCategory: allGhostPost(
            filter: {
                tags: {
                    elemMatch: {
                        slug: { eq: $slug }
                    }
                }
            }
        ) {
            nodes {
                id
                slug
                title
                excerpt
                custom_excerpt
                tags {
                    id
                    slug
                    name
                }
            }
        }
    }
`;
