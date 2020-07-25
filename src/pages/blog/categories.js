import React from "react";
import { graphql } from "gatsby";
import { useIntl } from "gatsby-plugin-intl";
import PropTypes from "prop-types";
import styled from "styled-components";

import CenteredContent from "~layouts/centeredContent";
import PostTeaserCard from "~components/postTeaserCard";
import SEO from "~components/seo";
import SiteLayout from "~layouts/siteLayout";
import { mapCategorySlugToI18nKey } from "~utils/mapCategorySlugToI18nKey";
import theme from "~styles/theme";

const Categories =  ({ data: { allCategories, allPosts}, location }) => {
    const intl = useIntl();

    return (
        <SiteLayout>
            <SEO
                title={intl.formatMessage({ id: 'seo_categories_title' })}
                description={intl.formatMessage({ id: 'seo_categories_description' })}
                pathname={location.pathname}
            />

            <CenteredContent>
                {allCategories.nodes.map((category) => {
                    const i18nCategoryName = mapCategorySlugToI18nKey(category.slug);
                    return (
                        <StyledContent
                            key={category.id}
                            id={category.slug}
                            >
                            <StyledHeading>
                                {intl.formatMessage({ id: i18nCategoryName }).toUpperCase()}
                            </StyledHeading>
                            <StyledSeparator></StyledSeparator>

                            {allPosts.nodes.map(post => {
                                const renderPost = post.tags.filter(tag => {
                                    // Category IDs always start with 'Ghost__Tag__' and end with numbers
                                    const categoryId = category.id.replace('Ghost__Tag__', '');
                                    return tag.id === categoryId;
                                });
                                if (!renderPost.length)
                                    return null;

                                return (
                                    <StyledTeaserCardArea key={post.id}>
                                        <PostTeaserCard post={post}></PostTeaserCard>
                                    </StyledTeaserCardArea>
                                );
                            })}
                        </StyledContent>
                    );
                })}
            </CenteredContent>
        </SiteLayout>
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
                postCount: { gt: 0 },
                slug: { ne: "data-schema" }
            }
        ) {
            nodes {
                id
                slug
                name
                description
            }
        }

        allPosts: allGhostPost (
            sort: {
                fields: published_at
                order: DESC
            },
            filter: {
                slug: { ne: "data-schema" }
            }
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

const StyledHeading = styled.h1`
    font-size: ${theme.fontSize.h1};
    font-weight: ${theme.fontWeight.f500};

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
