import React from "react";
import { graphql } from "gatsby";

import Content from "~components/layout/content.js";
import SEO from "~components/seo.js";
import { cleanInternalTags } from "~utils/cleanInternalTags";
import PropTypes from "prop-types";
import styled from "styled-components";
import theme from "~styles/theme";
import CategoryButtonList from "~components/CategoryButtonList";

export const BlogPost = ({ data: { post }, location }) => {
    // const categories = post.tags.filter(tag => {
    //     if (tag.name.startsWith('cat-'))
    //         return cleanInternalTags(tag, 'cat');
    //     else
    //         return null;
    // });

    const categories = post.tags;

    return (
        <Content>
            <SEO
                title={post.title}
                description={post.custom_excerpt || post.excerpt}
                pathname={location.pathname}
            />
            <article>
                <header>
                    <StyledPostHeading>{post.title}</StyledPostHeading>
                    <StyledPublishingDate>{post.published_at_pretty}</StyledPublishingDate>
                    {post.custom_excerpt &&
                        <StyledPostExcerpt>{post.custom_excerpt}</StyledPostExcerpt>
                    }
                </header>
                <hr/>
                <StyledPostContent dangerouslySetInnerHTML={{ __html: post.html }} />
                <CategoryButtonList categories={categories} />
            </article>
        </Content>
    );
}

BlogPost.propTypes = {
    post: PropTypes.object,
    location: PropTypes.object,
};

export default BlogPost;

export const pageQuery = graphql`
    query ($slug: String!) {
        post: ghostPost(slug: {eq: $slug} ) {
            ...GhostPostFields
        }
    }
`;

const StyledPostHeading = styled.h1`
    font-size: ${theme.fontSize.xl4};
    font-weight: 600;
`;

const StyledPublishingDate = styled.p`
    color: ${theme.color.gray700};
    font-size: ${theme.fontSize.sm};
    padding-top: 0.5rem;
`;

const StyledPostExcerpt = styled.div`
    color: ${theme.color.gray600};
    font-size: ${theme.fontSize.lg};
    padding: 1rem 0 1.5rem 0;
`;

const StyledPostContent = styled.section`
    & {
        font-size: ${theme.fontSize.md};
        line-height: 1.5;
        overflow-wrap: break-word;
        text-align: justify;
        hypens: auto;
        margin-bottom: 3em;
    }

    h2 {
        font-size: ${theme.fontSize.xl2};
        font-weight: 500;
        padding: 2rem 0 0.3rem 0;
        &:first-child {
            padding-top: 1rem;
        }
    }
    h3 {
        font-size: ${theme.fontSize.xl};
        font-weight: 500;
        padding: 1.125rem 0 0.3rem 0;
    }

    blockquote {
        border-left: 3px solid #3eb0ef;
        padding: 0 0 0 1.5rem;
        
        &:before {
            content: open-quote;
        }
        &:after {
            content:close-quote;
        }
    }

    figcaption {
        font-size: ${theme.fontSize.base};
        color: ${theme.color.gray600};
        padding: 0.875rem 0 0.875rem 0;
        text-align: center;
    }

    pre {
        padding: 1.5rem 0 1.5rem 0;
    }

    code {
        padding: 0 5px 2px;
        font-size: ${theme.fontSize.sm};
        line-height: 1em;
        font-weight: 400!important;
        background: ${theme.color.gray300};
        border-radius: 3px;
    }

    p {
        padding-bottom: 1rem;
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
        padding-left: 1.5rem;

        li {
            padding-bottom: 0.5rem;
        }
    }
    ol {
        list-style-type: decimal;
    }
    ul {
        list-style-type: disc;
    }

    /* Koenig styles (coming from Ghost itself)
    /* ---------------------------------------------------------- */
    .kg-width-full {
        position: relative;
        display: inline-block;
        margin-left: 0;
        margin-right: 0;
        width: 100vw;
    }
    .kg-width-wide {
        max-width: 1040px;
    }
    /* ---------------------------------------------------------- */
    .kg-bookmark-card {
        width: 100%;
        margin-top: 0;
    }
    .kg-bookmark-container {
        display: flex;
        min-height: 148px;
        text-decoration: none;
        border-radius: 3px;
        box-shadow: 0 2px 5px -1px rgba(0, 0, 0, 0.15), 0 0 1px rgba(0, 0, 0, 0.09);
    }
    .kg-bookmark-container:hover {
        text-decoration: none;
        box-shadow: 0 2px 5px -1px rgba(0, 0, 0, 0.15), 0 0 1px rgba(0, 0, 0, 0.09);
    }
    .kg-bookmark-content {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        padding: 20px;
    }
    .kg-bookmark-title {
        color: color(var(--color-secondary) l(-30%));
        font-size: 1.6rem;
        line-height: 1.5em;
        font-weight: 600;
        transition: color 0.2s ease-in-out;
    }
    .kg-bookmark-container:hover .kg-bookmark-title {
        color: #4299e1;
    }
    .kg-bookmark-description {
        display: -webkit-box;
        overflow-y: hidden;
        margin-top: 12px;
        max-height: 48px;
        color: color(var(--color-secondary) l(-10%));
        font-size: 1.5rem;
        line-height: 1.5em;
        font-weight: 400;
    
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }
    .kg-bookmark-thumbnail {
        position: relative;
        min-width: 33%;
        max-height: 100%;
    }
    .kg-bookmark-thumbnail img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: 0 3px 3px 0;
    
        object-fit: cover;
    }
    .kg-bookmark-metadata {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        margin-top: 14px;
        color: color(var(--color-secondary) l(-10%));
        font-size: 1.5rem;
        font-weight: 400;
    }
    .kg-bookmark-icon {
        margin-right: 8px;
        width: 22px;
        height: 22px;
    }
    .kg-bookmark-author {
        line-height: 1.5em;
    }
    .kg-bookmark-author:after {
        content: "•";
        margin: 0 6px;
    }
    .kg-bookmark-publisher {
        overflow: hidden;
        max-width: 240px;
        line-height: 1.5em;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
`;
