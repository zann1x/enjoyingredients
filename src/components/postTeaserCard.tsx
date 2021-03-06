import React from 'react';
import Img from 'gatsby-image';
import { Link } from 'gatsby-plugin-intl';
import styled from 'styled-components';

import CategoryButton from '~/components/categoryButton';
import theme from '~/styles/theme';
import { createPathFromSlug, EUrlType } from '~/utils/createPathFromSlug';

interface PostTeaserCardProps {
    post: {
        slug: string;
        title: string;
        featureImageSharp;
        excerpt: string;
        custom_excerpt: string;
        tags;
    };
}

const PostTeaserCard: React.FC<PostTeaserCardProps> = ({
    post: { slug, title, featureImageSharp, excerpt, custom_excerpt, tags },
}) => {
    const postUrl: string = createPathFromSlug(EUrlType.BLOG_POST, slug);

    let post_description: string = '';
    if (custom_excerpt === null) {
        if (excerpt.length > 250) {
            // TODO: cut the text off a little more gentle at a full stop
            post_description = excerpt.substr(0, 250);
            const lastWhitespace = post_description.lastIndexOf(' ');
            if (
                lastWhitespace !== -1 &&
                lastWhitespace !== post_description.length
            ) {
                post_description = post_description.substr(0, lastWhitespace);
            }
            post_description = post_description.trim().concat('...');
        } else {
            post_description = excerpt;
        }
    }
    const description =
        custom_excerpt !== null ? custom_excerpt : post_description;

    return (
        <StyledTeaserBox>
            {featureImageSharp && (
                <Link to={postUrl}>
                    <StyledFeatureImg
                        alt="Teaser"
                        fluid={featureImageSharp.childImageSharp.fluid}
                        objectFit="cover"
                        objectPosition="50% 50%"
                    />
                </Link>
            )}
            <StyledTextArea>
                <Link to={postUrl}>
                    <StyledHeading>{title || slug}</StyledHeading>
                    <StyledExcerpt>{description}</StyledExcerpt>
                </Link>
            </StyledTextArea>

            <StyledCategoryButtons>
                {tags.map((category) => {
                    return (
                        <CategoryButton
                            key={category.id}
                            slug={category.slug}
                        ></CategoryButton>
                    );
                })}
            </StyledCategoryButtons>
        </StyledTeaserBox>
    );
};

export default PostTeaserCard;

const StyledHeading = styled.p`
    font-size: ${theme.fontSize.xl};
    font-weight: ${theme.fontWeight.f700};
`;

const StyledFeatureImg = styled(Img)`
    border-radius: 0.5rem 0.5rem 0 0;
    max-height: 350px;
`;

const StyledExcerpt = styled.p`
    font-size: ${theme.fontSize.base};

    padding-top: 0.25rem;
`;

const StyledTextArea = styled.div`
    padding: 1rem 1.5rem 0.5rem;
`;

const StyledCategoryButtons = styled.div`
    padding: 1rem 1.25rem;
`;

const StyledTeaserBox = styled.div`
    border-radius: 0.5rem;
    box-shadow: 0 0px 15px -3px rgba(0, 0, 0, 0.1),
        0 4px 6px -2px rgba(0, 0, 0, 0.5);
    &:hover {
        background-color: #f7fafc;
        box-shadow: 0 0px 20px -3px rgba(0, 0, 0, 0.3),
            0 4px 6px -2px rgba(0, 0, 0, 0.7);
    }
`;
