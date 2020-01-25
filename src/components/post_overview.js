import React from "react";
import { Link } from "gatsby";

const PostOverview = (props) => {
    const slug = props.slug;
    const title = props.title;
    const description = props.description;
    const categories = props.categories;

    return (
        <div className="mx-5 mb-6 rounded shadow-md bg-gray-300">
            <img className="w-full" alt="Teaser" src="https://kinsta.com/wp-content/uploads/2018/04/what-is-github-1-1.png" />
            <div className="px-6 py-4">
                <h2 className="font-bold text-xl">
                    <Link to={slug}>
                        {title}
                    </Link>
                </h2>
                <p className="text-gray-700 text-base">
                    {description}
                </p>
            </div>
            <div className="px-5 py-4">
                {categories.map(category => {
                    return (
                        <Link to={`/categories/${category}`} className="inline-block rounded-full px-3 py-1 mx-1 text-sm font-semibold text-gray-700 bg-gray-100">
                            {category}
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}

export default PostOverview;
