import React from "react";
import { Link } from "gatsby";

const CategoryButton = ({ category }) => {
    return (
        <Link to={`/categories/${category}`} className="inline-block rounded-full px-3 py-1 mx-1 text-sm font-semibold text-gray-700 bg-gray-100">
            {category}
        </Link>
    );
}

export default CategoryButton;
