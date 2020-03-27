import React from "react";
import { graphql } from "gatsby";
import PropTypes from "prop-types";

import CenteredContent from "~components/layout/centeredContent";
import PostTeaserCard from "~components/postTeaserCard";
import SEO from "~components/seo";

const Categories =  ({ data: { allCategories, allPosts}, location }) => {
    return (
        <CenteredContent>
            <SEO
                title={'Kategorieübersicht'}
                description={'Übersicht aller Kategorien'}
                pathname={location.pathname}
            />

            {allCategories.nodes.map((category) => {
                return (
                    <div
                        key={category.id}
                        id={category.slug}
                        className="flex flex-wrap flex-col justify-center mt-6 first:mt-0"
                        >
                        <h2 className="mx-auto pb-2 text-4xl">
                            {category.name.toUpperCase()}
                        </h2>
                        <span className="border-t-2 border-gray-900 pb-8"></span>

                        {allPosts.nodes.map(post => {
                            const renderPost = post.tags.filter(tag => {
                                // Category IDs always start with 'Ghost__Tag__' and end with numbers
                                const categoryId = category.id.replace('Ghost__Tag__', '');
                                return tag.id === categoryId;
                            });
                            if (!renderPost.length)
                                return null;

                            return (
                                <div key={post.id} className="max-w-xl mb-6 mx-auto">
                                    <PostTeaserCard post={post}></PostTeaserCard>
                                </div>
                            );
                        })}
                    </div>
                );
            })}
        </CenteredContent>
    );
}

Categories.propTypes = {
    allCategories: PropTypes.arrayOf(PropTypes.object),
    allPosts: PropTypes.arrayOf(PropTypes.object),
};

export default Categories;

export const pageQuery = graphql`
    query {
        allCategories: allGhostTag(
            filter: {
                postCount: { gt: 0 }
            }
        ) {
            nodes {
                id
                slug
                name
                description
            }
        }

        allPosts: allGhostPost {
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
