import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';

import CategoryButton from '~/components/categoryButton';
import { createPathFromSlug, EUrlType } from '~/utils/createPathFromSlug';

interface PostTeaserCardProps {
    post: any;
}

const PostTeaserCard = ({ post }: PostTeaserCardProps) => {
    const postUrl: string = createPathFromSlug(EUrlType.BLOG_POST, post.slug);

    let post_description: string = '';
    if (post.custom_excerpt === null) {
        if (post.excerpt.length > 250) {
            // TODO: cut the text off a little more gentle at a full stop
            post_description = post.excerpt.substr(0, 250);
            const lastWhitespace = post_description.lastIndexOf(' ');
            if (
                lastWhitespace !== -1 &&
                lastWhitespace !== post_description.length
            ) {
                post_description = post_description.substr(0, lastWhitespace);
            }
            post_description = post_description.trim().concat('...');
        } else {
            post_description = post.excerpt;
        }
    }
    const description =
        post.custom_excerpt !== null ? post.custom_excerpt : post_description;

    return (
        <StyledTeaserBox>
            {post.feature_image && (
                <Link href={postUrl}>
                    <a>
                        <StyledFeatureImg
                            src={post.feature_image}
                            alt="Teaser Image"
                            layout="responsive"
                            width="auto"
                            height="auto"
                            objectFit="cover"
                            objectPosition="50% 50%"
                            priority={true}
                        />
                    </a>
                </Link>
            )}
            <StyledTextArea>
                <Link href={postUrl}>
                    <a>
                        <StyledHeading>{post.title || post.slug}</StyledHeading>
                        <StyledExcerpt>{description}</StyledExcerpt>
                    </a>
                </Link>
            </StyledTextArea>

            <StyledCategoryButtons>
                {post.tags.map((category) => {
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
    font-size: ${({ theme }) => theme.fontSize.xl};
    font-weight: ${({ theme }) => theme.fontWeight.f700};
`;

const StyledFeatureImg = styled(Image)`
    border-radius: 0.5rem 0.5rem 0 0;
    max-height: 350px;
`;

const StyledExcerpt = styled.p`
    font-size: ${({ theme }) => theme.fontSize.base};

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
