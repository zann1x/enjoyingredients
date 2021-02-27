import React from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import styled from 'styled-components';

import CenteredContent from '~/layouts/centeredContent';
import PostTeaserCard from '~/components/postTeaserCard';
import SEO from '~/components/seo';
import SiteLayout from '~/layouts/siteLayout';
import { mapCategorySlugToI18nKey } from '~/utils/mapCategorySlugToI18nKey';
import { getAllPostsWithTags, getAllTagsWithPosts } from '~/lib/ghost-api';
import { GetStaticProps } from 'next';

interface RecipesProps {
    allCategories: any;
    allPosts: any;
}

const Recipes = ({ allCategories, allPosts }: RecipesProps) => {
    const { t } = useTranslation('common');

    return (
        <SiteLayout>
            <SEO
                title={t('seo_categories_title')}
                description={t('seo_categories_description')}
            />

            <CenteredContent>
                {/* TODO: not all posts are necessarily in a category */}
                {allCategories.map((category) => {
                    const i18nCategoryName = mapCategorySlugToI18nKey(
                        category.slug,
                    );
                    return (
                        <StyledContent key={category.id} id={category.slug}>
                            <StyledHeading>
                                {t(i18nCategoryName).toUpperCase()}
                            </StyledHeading>
                            <StyledSeparator></StyledSeparator>

                            {allPosts.map((post) => {
                                const renderPost = post.tags.filter((tag) => {
                                    // Category IDs always start with 'Ghost__Tag__' and end with numbers
                                    const categoryId = category.id.replace(
                                        'Ghost__Tag__',
                                        '',
                                    );
                                    return tag.id === categoryId;
                                });
                                if (!renderPost.length) {
                                    return null;
                                }

                                return (
                                    <StyledTeaserCardArea key={post.id}>
                                        <PostTeaserCard post={post} />
                                    </StyledTeaserCardArea>
                                );
                            })}
                        </StyledContent>
                    );
                })}
            </CenteredContent>
        </SiteLayout>
    );
};

export default Recipes;

export const getStaticProps: GetStaticProps = async (context) => {
    const allCategories = (await getAllTagsWithPosts()) || [];
    const allPosts = (await getAllPostsWithTags()) || [];
    if (!allPosts) {
        return { notFound: true };
    }

    return {
        props: {
            allCategories,
            allPosts,
            ...(await serverSideTranslations(context.locale, ['common'])),
        },
    };
};

const StyledHeading = styled.h1`
    font-size: ${({ theme }) => theme.fontSize.h1};
    font-weight: ${({ theme }) => theme.fontWeight.f500};

    margin-right: auto;
    margin-left: auto;
    padding-top: 0.25rem;
    padding-bottom: 0.5rem;
`;

const StyledSeparator = styled.span`
    border-top-width: 2px;
    border-color: #1a202c;
    padding-bottom: 2rem;
`;

const StyledContent = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    justify-content: center;
    margin-top: 1.5rem;
    &:first-child {
        margin-top: 0;
    }
`;

const StyledTeaserCardArea = styled.div`
    max-width: 36rem;
    margin-bottom: 1.5rem;
    margin-right: auto;
    margin-left: auto;
`;
