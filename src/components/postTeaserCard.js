import React from "react";
import { Link } from "gatsby";
import CategoryButton from "~components/categoryButton";
import PropTypes from "prop-types";
import { createPathFromSlug, EUrlType } from "~utils/createPathFromSlug";

import FallbackFeatureImage from "~content/img/fallback-feature-img.jpg";

const PostTeaserCard = ({ post: { slug, title, feature_image, excerpt, custom_excerpt, tags }}) => {
    const postUrl = createPathFromSlug(EUrlType.BLOG_POST, slug);
    const img = feature_image !== null ? feature_image : FallbackFeatureImage;
    let post_description = '';
    if (custom_excerpt === null) {
        post_description = excerpt.length > 250
                            ? excerpt.substr(0, 250).trim().concat('...')
                            : excerpt;
    }
    const description = custom_excerpt !== null ? custom_excerpt : post_description;

    return (
        <div className="rounded shadow-lg">
            <Link to={postUrl}>
                <img className="w-full" alt="Teaser" src={img} />
            </Link>
            <div className="px-6 pt-4 pb-2">
                <Link to={postUrl}>
                    <h2 className="font-bold text-2xl">
                        {title || slug}
                    </h2>
                    <p className="pt-1 text-lg">
                        {description}
                    </p>
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
