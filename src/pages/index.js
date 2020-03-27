import React from "react";
import { graphql } from "gatsby";
import PropTypes from "prop-types";

import Footer from "~components/footer";
import Navbar from "~components/navbar";
import PostTeaserCard from "~components/postTeaserCard";
import SEO from "~components/seo";
import config from '~utils/config';

export const Index = ({ data: { site, latestPosts }}) => {
    return (
        <>
            <SEO
                title="The other food blog"
                description={config.siteDescription}
                pathname="/"
            />
            <Navbar siteTitle={site.siteMetadata.title}></Navbar>

            <div className="container mx-auto px-2 py-6 w-11/12">
                {latestPosts.nodes.map((post) => {
                    return (
                        <div key={post.id} className="max-w-xl mb-6 mx-auto">
                            <PostTeaserCard post={post}></PostTeaserCard>
                        </div>
                    );
                })}
            </div>

            <Footer></Footer>
        </>
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
            limit: 8
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
