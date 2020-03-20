import React from "react";
import { Link } from "gatsby";
import CategoryButton from "~components/categoryButton";
import PropTypes from "prop-types";
import { createPathFromSlug, EUrlType } from "~utils/createLinkFromSlug";

const PostTeaserCard = ({ post: { slug, title, feature_image, excerpt, custom_excerpt, tags }}) => {
    const postUrl = createPathFromSlug(EUrlType.BLOG_POST, slug);
    const description = custom_excerpt || excerpt;

    return (
        <div className="rounded shadow-md bg-gray-300">
            <Link to={postUrl}>
                <img className="w-full" alt="Teaser" src={feature_image} />
            </Link>
            <div className="px-6 py-4">
                <Link to={postUrl}>
                    <h2 className="font-bold text-xl">
                        {title || slug}
                    </h2>
                    <p className="text-gray-700 text-base">
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
