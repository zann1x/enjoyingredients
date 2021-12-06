import React from 'react';
import { graphql } from 'gatsby';
import { IntlShape, Link, useIntl } from 'gatsby-plugin-intl';
import styled from 'styled-components';

import PostTeaserCard from '~/components/postTeaserCard';
import SEO from '~/components/seo';
import SiteLayout from '~/layouts/siteLayout';
import CenteredContent from '~/layouts/centeredContent';
import config from '~/utils/config';
import { EUrlType } from '~/utils/createPathFromSlug';
import theme from '~/styles/theme';

interface IndexProps {
    data: {
        latestPosts;
    };
    location;
}

export const Index: React.FC<IndexProps> = ({
    data: { latestPosts },
    location,
}) => {
    const intl: IntlShape = useIntl();

    let displayedContent;
    if (latestPosts.nodes.length === 0) {
        displayedContent = (
            <StyledText>{intl.formatMessage({ id: 'empty_site' })}</StyledText>
        );
    } else {
        displayedContent = latestPosts.nodes.map((post, index: number) => {
            if (index < 5) {
                return (
                    <StyledTeaserCardArea key={post.id}>
                        <PostTeaserCard post={post}></PostTeaserCard>
                    </StyledTeaserCardArea>
                );
            } else {
                return <></>;
            }
        });
    }

    return (
        <SiteLayout>
            <SEO
                title="The other food blog"
                description={config.siteDescription}
                pathname={location.pathname}
            />

            <CenteredContent>{displayedContent}</CenteredContent>

            {latestPosts.nodes.length > 5 && (
                <StyledMoreButton to={EUrlType.BLOG_RECIPES}>
                    {intl.formatMessage({ id: 'startpage_more_posts' })}
                </StyledMoreButton>
            )}
        </SiteLayout>
    );
};

export default Index;

export const pageQuery = graphql`
    query {
        latestPosts: allGhostPost(
            filter: { slug: { ne: "data-schema" } }
            sort: { order: DESC, fields: published_at }
            limit: 6
        ) {
            nodes {
                id
                slug
                title
                feature_image
                featureImageSharp {
                    childImageSharp {
                        fluid(maxWidth: 1920) {
                            ...GatsbyImageSharpFluid_withWebp
                        }
                    }
                }
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

const StyledText = styled.p`
    text-align: center;
    font-size: 1.1rem;
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
        background-color: ${theme.color.gray300};

        &:focus {
            background-color: ${theme.color.gray200};
        }
    }
`;
