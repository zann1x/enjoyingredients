import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import Error from 'next/error';
import styled from 'styled-components';

import SEO from '~/components/seo';
import ContentFooter from '~/components/contentFooter';
import { getAllPagesRaw, getPageBySlug } from '~/lib/ghost-api';
import CenteredContent from '~/layouts/centeredContent';
import SiteLayout from '~/layouts/siteLayout';
import { EUrlType } from '~/utils/createPathFromSlug';

interface PageProps {
    page: any;
}

export const Page = ({ page }: PageProps) => {
    // TODO: Do I really need this?
    if (!page?.slug) {
        return <Error statusCode={404} />
    }

    return (
        <SiteLayout>
            <SEO
                title={page.title}
                description={page.custom_excerpt || page.excerpt}
            />

            <CenteredContent>
                <article>
                    <header>
                        <StyledPostHeading>{page.title}</StyledPostHeading>
                    </header>
                    <StyledPostContent
                        className="ghost-content load-external-scripts"
                        dangerouslySetInnerHTML={{ __html: page.html }}
                    />
                </article>

                <StyledEndPostDiv />
                <ContentFooter />
            </CenteredContent>
        </SiteLayout>
    );
};

export default Page;

export const getStaticPaths: GetStaticPaths = async () => {
    const pages = (await getAllPagesRaw()) || [];
    const paths = pages.map((page) => `${EUrlType.PAGE}/${page.slug}`);

    return {paths, fallback: false}
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    // TODO: filter out pages for paths not fitting to the language of the site
    //       (e.g. pages with tag #de should not appear under .com/en/)
    const page = await getPageBySlug(params.slug);

    return {props: {page}};
};

const StyledPostHeading = styled.h1`
    font-size: ${({ theme }) => theme.fontSize.h1};
    font-weight: ${({ theme }) => theme.fontWeight.f600};
    text-align: center;
    font-style: italic;
    margin-bottom: 1rem;
`;

const StyledEndPostDiv = styled.div`
    border-top: 1px solid #a6a5a5;
    content: ' ';
    width: 30px;
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