import React from "react";
import { Link } from "gatsby";
import CategoryButton from "~components/categoryButton";
import PropTypes from "prop-types";
import styled from "styled-components";

import theme from "~styles/theme";
import { createPathFromSlug, EUrlType } from "~utils/createPathFromSlug";

import FallbackFeatureImage from "~content/img/fallback-feature-img.jpg";

const PostTeaserCard = ({ post: { slug, title, feature_image, excerpt, custom_excerpt, tags }}) => {
    const postUrl = createPathFromSlug(EUrlType.BLOG_POST, slug);
    const img = feature_image !== null ? feature_image : FallbackFeatureImage;
    let post_description = '';
    if (custom_excerpt === null) {
        if (excerpt.length > 250) {
            post_description = excerpt.substr(0, 250);
            const lastWhitespace = post_description.lastIndexOf(' ');
            if (lastWhitespace !== -1 && lastWhitespace !== post_description.length) {
                post_description = post_description.substr(0, lastWhitespace);
            }
            post_description = post_description.trim().concat('...');
        } else {
            post_description = excerpt;
        }
    }
    const description = custom_excerpt !== null ? custom_excerpt : post_description;

    return (
        <div className="rounded shadow-lg">
            <Link to={postUrl}>
                <img className="w-full" alt="Teaser" src={img} />
            </Link>
            <div className="px-6 pt-4 pb-2">
                <Link to={postUrl}>
                    <StyledHeading>
                        {title || slug}
                    </StyledHeading>
                    <StyledExcerpt>
                        {description}
                    </StyledExcerpt>
                </Link>
            </div>

            <div className="px-5 py-4">
                {tags.map(category => {
                    return (
                        <CategoryButton
                            key={category.id}
                            category={category}
                        ></CategoryButton>
                    );
                })}
            </div>
        </div>
    );
}

PostTeaserCard.propTypes = {
    post: PropTypes.object,
};

export default PostTeaserCard;

const StyledHeading = styled.p`
    font-size: ${theme.fontSize.xl};
    font-weight: ${theme.fontWeight.f700};
`;

const StyledExcerpt = styled.p`
    font-size: ${theme.fontSize.base};

    padding-top: 0.25rem;
`;
