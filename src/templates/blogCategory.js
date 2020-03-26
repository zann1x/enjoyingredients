import React from "react";
import { graphql } from "gatsby";

import CenteredContent from "~components/layout/centeredContent";
import PostTeaserCard from "~components/postTeaserCard";
import SEO from "~components/seo";
import PropTypes from "prop-types";

const BlogCategory =  ({ data: { category, postsInCategory}, location }) => {
    return (
        <CenteredContent>
            <SEO
                title={category.name}
                description={category.description || category.name}
                pathname={location.pathname}
            />
            <div className="flex flex-wrap flex-col justify-center">
                <h1 className="mx-auto pb-2 text-4xl">{category.name}</h1>
                <hr></hr>
                <span className="pb-8"></span>

                {postsInCategory.nodes.map((post) => {
                    return (
                        <div key={post.id} className="max-w-xl mb-6 mx-auto">
                            <PostTeaserCard post={post}></PostTeaserCard>
                        </div>
                    );
                })}
            </div>
        </CenteredContent>
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
            description
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
                feature_image
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
