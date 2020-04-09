import React from "react";
import { graphql } from "gatsby";
import { Link, useIntl } from "gatsby-plugin-intl";
import PropTypes from "prop-types";
import styled from "styled-components";

import PostTeaserCard from "~components/postTeaserCard";
import SEO from "~components/seo";
import SiteLayout from "~components/layout/siteLayout";
import config from '~utils/config';
import { EUrlType } from '~utils/createPathFromSlug';
import theme from '~styles/theme';

export const Index = ({ data: { latestPosts }}) => {
    const intl = useIntl();

    return (
        <SiteLayout>
            <SEO
                title="The other food blog"
                description={config.siteDescription}
                pathname="/"
            />

            <div className="container mx-auto px-2 py-6 w-11/12">
                {latestPosts.nodes.map((post) => {
                    return (
                        <div key={post.id} className="max-w-xl mb-6 mx-auto">
                            <PostTeaserCard post={post}></PostTeaserCard>
                        </div>
                    );
                })}
            </div>

            <StyledMoreButton to={EUrlType.BLOG_CATEGORY}>
                {/* <Link to={EUrlType.BLOG_CATEGORY}> */}
                    {intl.formatMessage({ id: 'startpage_more_posts' })}
                {/* </Link> */}
            </StyledMoreButton>
        </SiteLayout>
    );
}

Index.propTypes = {
    latestPosts: PropTypes.arrayOf(PropTypes.object),
};

export default Index;

export const pageQuery = graphql`
    query {
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

const StyledMoreButton = styled(Link)`
    border: 1px solid ${theme.color.gray600};
    border-radius: 1.5rem;
    margin: 0 auto 1.5rem;
    padding: 0.75rem 1.5rem;
    text-align: center;

    &:hover {
        background-color: ${theme.color.gray100};

        &:focus {
            background-color: ${theme.color.gray200};
        }
    }
`;
