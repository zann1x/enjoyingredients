import { createGlobalStyle } from 'styled-components';
import theme from '~/styles/theme';

const GlobalStyle = createGlobalStyle`
    p {
        margin: 0.5rem 0;
    }

    /* Styling for content that is coming from Ghost CMS */
    .ghost-content {
        th, td {
            padding: 0.5rem;
            border: 1px solid #ddd;
        }
        th {
            background-color: #f8f8f8;
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
    }
`;

export default GlobalStyle;
