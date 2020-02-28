import React from "react";
import { Link } from "gatsby";
import CategoryButton from "~components/categoryButton";
import PropTypes from "prop-types";
import { createPathFromSlug, EUrlType } from "~utils/createLinkFromSlug";

const PostTeaserCard = ({ post: { slug, title, excerpt, custom_excerpt, tags }}) => {
    const postUrl = createPathFromSlug(EUrlType.BLOG_POST, slug);
    const description = custom_excerpt || excerpt;

    return (
        <div className="rounded shadow-md bg-gray-300">
            <img className="w-full" alt="Teaser" src="https://kinsta.com/wp-content/uploads/2018/04/what-is-github-1-1.png" />
            <div className="px-6 py-4">
                <h2 className="font-bold text-xl">
                    <Link to={postUrl}>
                        {title || slug}
                    </Link>
                </h2>
                <p className="text-gray-700 text-base">
                    {description}
                </p>
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
