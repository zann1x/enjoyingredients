import React from "react";
import { graphql } from "gatsby";
import { useIntl } from "gatsby-plugin-intl";
import PropTypes from "prop-types";
import styled from "styled-components";

import CategoryButton from "~components/categoryButton";
import SEO from "~components/seo";
import CenteredContent from "~layouts/centeredContent";
import SiteLayout from "~layouts/siteLayout";
import theme from "~styles/theme";

import FallbackFeatureImage from "~content/img/fallback-feature-img.jpg";

export const BlogPost = ({ data: { post }, location }) => {
    const intl = useIntl();
    const categories = post.tags;
    const header_image = post.feature_image !== null ? post.feature_image : FallbackFeatureImage;
    const contact_us = intl.formatMessage({ id: "contact_us_via_mail" });

    return (
        <SiteLayout>
            <SEO
                title={post.title}
                description={post.custom_excerpt || post.excerpt}
                pathname={location.pathname}
            />

            <StyledHeroImage style={{backgroundImage: `url(${header_image})`}} />
            <CenteredContent>
                <article>
                    <header>
                        <StyledPostHeading>{post.title}</StyledPostHeading>
                        <StyledPublishingDate>{intl.formatDate(post.published_at, { day: 'numeric', month: 'long', year: 'numeric' })}</StyledPublishingDate>
                        {post.custom_excerpt &&
                            <StyledPostExcerpt className="post-content">{post.custom_excerpt}</StyledPostExcerpt>
                        }
                    </header>
                    <hr/>
                    <StyledPostContent className="ghost-content load-external-scripts" dangerouslySetInnerHTML={{ __html: post.html }} />
                    <StyledEndPostDiv />
                    <StyledCategoryButtonList>
                        {categories.map(category => {
                            return (
                                <CategoryButton
                                    key={category.id}
                                    category={category}
                                ></CategoryButton>
                            );
                        })}
                    </StyledCategoryButtonList>

                    <div>
                        <p>{ contact_us } <StyledExtLink href="mailto:mail@enjoyingredients.com">mail@enjoyingredients.com</StyledExtLink>!</p>
                    </div>
                </article>
            </CenteredContent>
        </SiteLayout>
    );
}

BlogPost.propTypes = {
    post: PropTypes.object,
    location: PropTypes.object,
};

export default BlogPost;

// TODO: only source data that is really need
export const pageQuery = graphql`
    query ($slug: String!) {
        post: ghostPost(slug: {eq: $slug} ) {
            ...GhostPostFields
        }
    }
`;

export const StyledHeroImage = styled.div`
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;

    height: 70vh;
    width: 100%;

    position: relative;

    &:before {
        width: 100vh;
    }
`;

export const StyledPostHeading = styled.h1`
    font-size: ${theme.fontSize.h1};
    font-weight: ${theme.fontWeight.f600};
`;

export const StyledPublishingDate = styled.p`
    color: ${theme.color.gray700};
    font-size: ${theme.fontSize.sm};
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
`;

export const StyledPostExcerpt = styled.div`
    color: ${theme.color.gray600};
    font-size: ${theme.fontSize.md};
    padding-top: 1rem;
    padding-bottom: 1.5rem;
`;

export const StyledEndPostDiv = styled.div`
    border-top: 1px solid #a6a5a5;
    content: " ";
    width: 30px;
`;

const StyledCategoryButtonList = styled.div`
    padding-top: 1rem;
    padding-bottom: 1rem;
`;

const StyledExtLink = styled.a`
    text-decoration: underline;
    &:hover {
        transition-timing-function: cubic-bezier(0.4, 0, 1, 1);
        transition-duration: 200ms;
        color: #4299e1;
    }
`;

export const StyledPostContent = styled.section`
    & {
        font-size: ${theme.fontSize.base};
        line-height: 1.625;
        overflow-wrap: break-word;
        text-align: left;
        hypens: auto;
        margin-bottom: 3em;
    }

    h2 {
        font-size: ${theme.fontSize.h2};
        font-weight: ${theme.fontWeight.f500};
        padding: 2rem 0 0.3rem 0;
        &:first-of-type {
            padding-top: 1rem;
        }
    }
    h3 {
        font-size: ${theme.fontSize.h3};
        font-weight: ${theme.fontWeight.f500};
        padding: 1.125rem 0 0.3rem 0;
    }

    figure.kg-card {
        &.kg-image-card {
            padding: 1rem 0;
            max-width: 100%;

            // TODO: max-width: 1040px;
            &.kg-width-wide {
                > .kg-image {
                    //max-width: 1040px;
                }
            }
            // TODO: max-width: 100vw
            &.kg-width-full {
                > .kg-image {
                    position: relative;
                    //max-width: 100vw;
                }
            }
        }

        &.kg-bookmark-card {
            margin: 1rem 0;
            width: 100%;

            a.kg-bookmark-container {
                box-shadow: 0 2px 5px -1px rgba(0,0,0,.15), 0 0 1px rgba(0,0,0,.09);
                color: #15171a;
                display: flex;
                min-height: 148px;
                text-decoration: none;

                @media (max-width: 500px) {
                    flex-direction: column;
                }

                div.kg-bookmark-content {
                    display: flex;
                    flex-grow: 1;
                    flex-direction: column;
                    justify-content: flex-start;
                    align-items: flex-start;
                    padding: 20px;

                    @media (max-width: 500px) {
                        order: 2;
                    }
    
                    div.kg-bookmark-title {
                        font-weight: ${theme.fontWeight.f600};
                        font-size: ${theme.fontSize.base};

                        @media (max-width: 500px) {
                            font-size: ${theme.fontSize.sm};
                        }
                    }
                    div.kg-bookmark-description {
                        overflow-y: hidden;
                        margin-top: 12px;
                        max-height: 48px;
                        color: #5d7179;
                        line-height: 1.5em;
                        font-weight: ${theme.fontWeight.f400};
                        font-size: ${theme.fontSize.base};

                        @media (max-width: 500px) {
                            font-size: ${theme.fontSize.sm};
                        }
                    }
                    div.kg-bookmark-metadata {
                        display: flex;
                        flex-wrap: wrap;
                        align-items: center;
                        margin-top: 14px;
                        color: #5d7179;
                        font-size: ${theme.fontSize.base};
                        font-weight: ${theme.fontWeight.f400};

                        @media (max-width: 500px) {
                            font-size: ${theme.fontSize.sm};
                            line-height: 1.5em;
                        }

                        img.kg-bookmark-icon {
                            margin-right: 8px;
                            width: 22px;
                            height: 22px;

                            @media (max-width: 500px) {
                                width: 18px;
                                height: 18px;
                            }
                        }
                        span.kg-bookmark-publisher {
                            overflow: hidden;
                            max-width: 240px;
                            line-height: 1.5em;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                        }
                    }
                }

                div.kg-bookmark-thumbnail {
                    position: relative;
                    min-width: 33%;
                    min-height: 160px;
                    max-height: 100%;

                    @media (max-width: 500px) {
                        width: 100%;
                        min-height: 160px;
                        order: 1;
                    }

                    img {
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                        order: 1;
                        border-radius: 0 3px 3px 0;
                    }
                }
            }
        }
    }

    blockquote {
        border-left: 3px solid #3f3f3f;
        margin: 1.5rem 0;
        padding: 0 0 0 1.5rem;
    }

    pre {
        padding: 1.5rem 0 1.5rem 0;
    }

    code {
        padding: 0 5px 2px;
        font-size: ${theme.fontSize.sm};
        line-height: 1em;
        font-weight: ${theme.fontWeight.f400} !important;
        background: ${theme.color.gray300};
        border-radius: 3px;
    }

    p {
        margin: 0.5rem 0;
    }

    a {
        text-decoration: underline;

        &:hover {
            transition: all .2s ease;
            color: #4299e1;
        }
    }

    ol, ul {
        list-style-position: outside;
        margin-left: 1.5rem;

        li {
            margin: 0.3rem 0;
        }
    }
    ol {
        list-style-type: decimal;
    }
    ul {
        list-style-type: disc;
    }
`;
