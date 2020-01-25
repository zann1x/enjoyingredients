import React from "react";
import { Link } from "gatsby";

const PostOverview = (props) => {
    const slug = props.slug;
    const title = props.title;
    const description = props.description;
    const categories = props.categories;

    return (
        <div className="w-auto max-w-lg rounded overflow-hidden shadow-md bg-gray-300">
            <img className="w-full" alt="Teaser" src="https://kinsta.com/wp-content/uploads/2018/04/what-is-github-1-1.png" />
            <div className="px-6 py-4">
                <Link to={slug} className="font-bold text-xl mb-4">
                    {title}
                </Link>
                <p className="text-gray-700 text-base">
                    {description}
                </p>
            </div>
            <div className="px-6 py-4">
                {categories.map(category => {
                    return (
                        <Link to={`/categories/${category}`} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                            {category}
                        </Link>
                    )
                })}
            </div>
        </div>
    );
}

export default PostOverview;
