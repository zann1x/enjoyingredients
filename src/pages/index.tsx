import React from 'react';
import { IntlShape, useIntl } from 'gatsby-plugin-intl';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import styled from 'styled-components';

import PostTeaserCard from '~/components/postTeaserCard';
import SEO from '~/components/seo';
import SiteLayout from '~/layouts/siteLayout';
import CenteredContent from '~/layouts/centeredContent';
import config from '~/config';
import { EUrlType } from '~/utils/createPathFromSlug';
import theme from '~/styles/theme';
import { getPostsForIndexPage } from '~/lib/ghost-api';

interface IndexProps {
    latestPosts: any;
}

export const Index = ({ latestPosts }: IndexProps) => {
    const intl: IntlShape = useIntl();

    let displayedContent;
    if (latestPosts.nodes.length === 0) {
        displayedContent = (
            <StyledText>{intl.formatMessage({ id: 'empty_site' })}</StyledText>
        );
    } else {
        displayedContent = latestPosts.nodes.map((post: any, index: number) => {
            if (index < 5) {
                return (
                    <StyledTeaserCardArea key={post.id}>
                        <PostTeaserCard post={post} />
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
                title={`${config.siteTitle} - ${intl.formatMessage({
                    id: 'index_title',
                })}`}
                description={intl.formatMessage({ id: 'index_description' })}
            />

            <CenteredContent>{displayedContent}</CenteredContent>

            {latestPosts.nodes.length > 5 && (
                <StyledMoreButton href={EUrlType.BLOG_CATEGORY}>
                    {intl.formatMessage({ id: 'startpage_more_posts' })}
                </StyledMoreButton>
            )}
        </SiteLayout>
    );
};

export default Index;

export const getStaticProps: GetStaticProps = async (context) => {
    const latestPosts = (await getPostsForIndexPage()) || [];
    return { props: { latestPosts } };
};

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
