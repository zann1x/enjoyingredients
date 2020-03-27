import React from "react";
import { Link } from "gatsby";
import PropTypes from "prop-types";
import { createIdPathFromSlug, EUrlType } from "~utils/createPathFromSlug";

const CategoryButton = ({ category }) => {
    const categoryPath = createIdPathFromSlug(EUrlType.BLOG_CATEGORY, category.slug);
    return (
        <Link to={categoryPath} className="inline-block rounded-full px-3 py-1 mx-1 text-sm font-semibold text-gray-700 bg-gray-200">
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
