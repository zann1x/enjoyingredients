import React from "react";

const CategoryButton = ({ category }) => {
    return (
        // <Link to={`/categories/${category}`} className="inline-block rounded-full px-3 py-1 mx-1 text-sm font-semibold text-gray-700 bg-gray-100">
        //     {category}
        // </Link>
        <p className="inline-block rounded-full px-3 py-1 mx-1 text-sm font-semibold text-gray-700 bg-gray-100">
            {category}
        </p>
    );
}

export default CategoryButton;
