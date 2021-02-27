import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import styled from 'styled-components';

import CategoryButton from '~/components/categoryButton';
import ContentFooter from '~/components/contentFooter';
import SEO from '~/components/seo';
import CenteredContent from '~/layouts/centeredContent';
import SiteLayout from '~/layouts/siteLayout';
import { GetStaticPaths, GetStaticProps } from 'next';
import Error from 'next/error';
import { getAllPostsRaw, getPostBySlug } from '~/lib/ghost-api';
import { EUrlType } from '~/utils/createPathFromSlug';

interface BlogPostProps {
    post: any;
}

export const BlogPost = ({ post }: BlogPostProps) => {
    // TODO: Do I really need this?
    if (!post?.slug) {
        return <Error statusCode={404} />;
    }

    const router = useRouter();

    const categories = post.tags;
    const publish_date: string = new Intl.DateTimeFormat(router.locale, {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    }).format(new Date(post.published_at));

    // TODO: lazy load images inside the post
    return (
        <SiteLayout>
            <SEO
                title={post.title}
                description={post.custom_excerpt || post.excerpt}
            />

            {post.feature_image && (
                <StyledHeroImage
                    src={post.feature_image}
                    alt="Feature Image"
                    layout="fill"
                    objectFit="cover"
                    objectPosition="50% 50%"
                    priority="true"
                />
            )}

            <CenteredContent>
                <article>
                    <header>
                        <StyledPostHeading>{post.title}</StyledPostHeading>
                        <StyledPublishingDate>
                            {publish_date}
                        </StyledPublishingDate>
                    </header>
                    <StyledPostContent
                        className="ghost-content load-external-scripts"
                        dangerouslySetInnerHTML={{ __html: post.html }}
                    />
                    <StyledEndPostDiv />
                    <StyledCategoryButtonList>
                        {categories.map((category) => {
                            return (
                                <CategoryButton
                                    key={category.id}
                                    slug={category.slug}
                                ></CategoryButton>
                            );
                        })}
                    </StyledCategoryButtonList>

                    <ContentFooter />
                </article>
            </CenteredContent>
        </SiteLayout>
    );
};

export default BlogPost;

export const getStaticPaths: GetStaticPaths = async () => {
    const posts = (await getAllPostsRaw()) || [];
    const paths = posts.map((post) => `${EUrlType.BLOG_POST}${post.slug}`);

    return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async (context) => {
    // TODO: filter out pages for paths not fitting to the language of the site
    //       (e.g. pages with tag #de should not appear under .com/en/)
    const post = await getPostBySlug(context.params.slug);
    if (!post) {
        return { notFound: true };
    }

    return {
        props: {
            post,
            ...(await serverSideTranslations(context.locale, ['common'])),
        },
    };
};

const StyledHeroImage = styled(Image)`
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;

    max-height: 70vh;
    width: 100%;

    position: relative;

    &:before {
        width: 100vh;
    }
`;

const StyledPostHeading = styled.h1`
    font-size: ${({ theme }) => theme.fontSize.h1};
    font-weight: ${({ theme }) => theme.fontWeight.f600};
    text-align: center;
    font-style: italic;
`;

const StyledPublishingDate = styled.p`
    color: ${({ theme }) => theme.color.gray700};
    font-size: ${({ theme }) => theme.fontSize.sm};
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    text-align: center;
`;

const StyledEndPostDiv = styled.div`
    border-top: 1px solid #a6a5a5;
    content: ' ';
    width: 30px;
    padding-bottom: 1rem;
`;

const StyledCategoryButtonList = styled.div`
    padding-bottom: 1rem;
`;

const StyledPostContent = styled.section`
    & {
        font-size: ${({ theme }) => theme.fontSize.base};
        line-height: 1.625;
        overflow-wrap: break-word;
        text-align: left;
        hypens: auto;
        margin-bottom: 3em;
    }

    h2 {
        font-size: ${({ theme }) => theme.fontSize.h2};
        font-weight: ${({ theme }) => theme.fontWeight.f500};
        padding: 2rem 0 0.3rem 0;
        &:first-of-type {
            padding-top: 1rem;
        }
    }
    h3 {
        font-size: ${({ theme }) => theme.fontSize.h3};
        font-weight: ${({ theme }) => theme.fontWeight.f500};
        padding: 1.125rem 0 0.3rem 0;
    }

    figure.kg-card {
        &.kg-image-card {
            padding: 1rem 0;
            max-width: 100%;

            .kg-image {
                margin-left: auto;
                margin-right: auto;
            }

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
                box-shadow: 0 2px 5px -1px rgba(0, 0, 0, 0.15),
                    0 0 1px rgba(0, 0, 0, 0.09);
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
                        font-weight: ${({ theme }) => theme.fontWeight.f600};
                        font-size: ${({ theme }) => theme.fontSize.base};

                        @media (max-width: 500px) {
                            font-size: ${({ theme }) => theme.fontSize.sm};
                        }
                    }
                    div.kg-bookmark-description {
                        overflow-y: hidden;
                        margin-top: 12px;
                        max-height: 48px;
                        color: #5d7179;
                        line-height: 1.5em;
                        font-weight: ${({ theme }) => theme.fontWeight.f400};
                        font-size: ${({ theme }) => theme.fontSize.base};

                        @media (max-width: 500px) {
                            font-size: ${({ theme }) => theme.fontSize.sm};
                        }
                    }
                    div.kg-bookmark-metadata {
                        display: flex;
                        flex-wrap: wrap;
                        align-items: center;
                        margin-top: 14px;
                        color: #5d7179;
                        font-size: ${({ theme }) => theme.fontSize.base};
                        font-weight: ${({ theme }) => theme.fontWeight.f400};

                        @media (max-width: 500px) {
                            font-size: ${({ theme }) => theme.fontSize.sm};
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
        font-size: ${({ theme }) => theme.fontSize.sm};
        line-height: 1em;
        font-weight: ${({ theme }) => theme.fontWeight.f400} !important;
        background: ${({ theme }) => theme.color.gray300};
        border-radius: 3px;
    }

    p {
        margin: 0.5rem 0;
    }

    a {
        text-decoration: underline;

        &:hover {
            color: #4299e1;
        }
    }

    ol,
    ul {
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
