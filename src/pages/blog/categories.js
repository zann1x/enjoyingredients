import React from "react";
import { graphql } from "gatsby";

import CenteredContent from "~components/layout/centeredContent";
import PostTeaserCard from "~components/postTeaserCard";
import SEO from "~components/seo";
import PropTypes from "prop-types";

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
                    <div key={category.id} className="flex flex-wrap flex-col justify-center">
                        <h2 id={`#${category.slug}`} className="mx-auto pb-2 text-4xl">
                            {category.name.toUpperCase()}
                        </h2>
                        <span className="border-t-2 border-gray-900 pb-8"></span>

                        {allPosts.nodes.map(post => {
                            const renderPost = post.tags.filter(tag => {
                                return tag.id === category.id;
                            });
                            if (!renderPost)
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
