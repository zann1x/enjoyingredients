import React from "react";
import { graphql, Link } from "gatsby";
import PropTypes from "prop-types";

import PostTeaserCard from "~components/postTeaserCard";
import SEO from "~components/seo.js";
import config from '~utils/config';
import CenteredContent from "../components/layout/centeredContent";

const Index = ({ data: { site, latestPosts }}) => {
    return (
        <CenteredContent>
            <SEO 
                title="The other food blog"
                description={config.siteDescription}
                pathname="/"
            />

            <div className="pb-4 min-w-full">
                {latestPosts.nodes.map((post) => {
                    return (
                        <div key={post.id} className="max-w-lg m-3">
                            <PostTeaserCard post={post}></PostTeaserCard>
                        </div>
                    );
                })}
            </div>
        </CenteredContent>
    );
}

Index.propTypes = {
    site: PropTypes.object,
    latestPosts: PropTypes.arrayOf(PropTypes.object),
};

export default Index;

export const pageQuery = graphql`
    query {
        site {
            siteMetadata {
                title
            }
        }

        latestPosts: allGhostPost(
            sort: {
                order: DESC,
                fields: published_at
            }
            limit: 3
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
