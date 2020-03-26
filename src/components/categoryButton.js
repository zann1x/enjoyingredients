import React from "react";
import { Link } from "gatsby";
import PropTypes from "prop-types";
import { createIdLinkFromSlug, EUrlType } from "~utils/createLinkFromSlug";

const CategoryButton = ({ category }) => {
    const categoryUrl = createIdLinkFromSlug(EUrlType.BLOG_CATEGORY, category.slug);
    return (
        <Link to={categoryUrl} className="inline-block rounded-full px-3 py-1 mx-1 text-sm font-semibold text-gray-700 bg-gray-200">
            {category.name}
        </Link>
    );
}

CategoryButton.propTypes = {
    category: PropTypes.shape({
        slug: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
    }),
};

export default CategoryButton;
