import React from "react";
import { graphql } from "gatsby";
import { Link, useIntl } from "gatsby-plugin-intl";
import PropTypes from "prop-types";
import styled from "styled-components";

import PostTeaserCard from "~components/postTeaserCard";
import SEO from "~components/seo";
import SiteLayout from "~layouts/siteLayout";
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

            <StyledContent>
                {latestPosts.nodes.map((post) => {
                    return (
                        <StyledTeaserCardArea key={post.id}>
                            <PostTeaserCard post={post}></PostTeaserCard>
                        </StyledTeaserCardArea>
                    );
                })}
            </StyledContent>

            <StyledMoreButton to={EUrlType.BLOG_CATEGORY}>
                {intl.formatMessage({ id: 'startpage_more_posts' })}
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
            filter: {
                slug: {ne: "data-schema"}
            },
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

const StyledContent = styled.div`
    width: 91.666667%;
    @media (min-width: 640px) {
        max-width: 640px;
    }
    @media (min-width: 768px) {
        max-width: 768px;
    }
    @media (min-width: 1024px) {
        max-width: 1024px;
    }
    @media (min-width: 1280px) {
        max-width: 1280px;
    }

    margin-right: auto;
    margin-left: auto;
    padding: 1.5rem 0.5rem;
`;

const StyledTeaserCardArea = styled.div`
    max-width: 36rem;
    margin-bottom: 1.5rem;
    margin-right: auto;
    margin-left: auto;
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
