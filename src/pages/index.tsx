import React from 'react';
import { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from 'next/link';
import styled from 'styled-components';

import PostTeaserCard from '~/components/postTeaserCard';
import SEO from '~/components/seo';
import SiteLayout from '~/layouts/siteLayout';
import CenteredContent from '~/layouts/centeredContent';
import config from '~/config';
import { EUrlType } from '~/utils/createPathFromSlug';
import { getPostsForIndexPage } from '~/lib/ghost-api';

interface IndexProps {
    latestPosts: any;
}

export const Index = ({ latestPosts }: IndexProps) => {
    const { t } = useTranslation('common');

    let displayedContent;
    if (latestPosts.length === 0) {
        displayedContent = <StyledText>{t('empty_site')}</StyledText>;
    } else {
        displayedContent = latestPosts.map((post: any, index: number) => {
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
                title={`${config.siteTitle} - ${t('index_title')}`}
                description={t('index_description')}
            />

            <CenteredContent>{displayedContent}</CenteredContent>

            {latestPosts.length > 5 && (
                <StyledMoreLink href={EUrlType.BLOG_CATEGORY}>
                    <a>{t('startpage_more_posts')}</a>
                </StyledMoreLink>
            )}
        </SiteLayout>
    );
};

export default Index;

export const getStaticProps: GetStaticProps = async (context) => {
    const latestPosts = (await getPostsForIndexPage()) || [];
    if (!latestPosts) {
        return { notFound: true };
    }

    return {
        props: {
            latestPosts,
            ...(await serverSideTranslations(context.locale, ['common'])),
        },
    };
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

const StyledMoreLink = styled(Link)`
    border: 1px solid ${({ theme }) => theme.color.gray600};
    border-radius: 1.5rem;
    margin: 0 auto 1.5rem;
    padding: 0.75rem 1.5rem;
    text-align: center;

    &:hover {
        background-color: ${({ theme }) => theme.color.gray300};

        &:focus {
            background-color: ${({ theme }) => theme.color.gray200};
        }
    }
`;
