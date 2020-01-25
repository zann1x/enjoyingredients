import React from "react";
import { Link } from "gatsby";

const SwitchPostNavigation = ({ previousPost, nextPost }) => {
    if (previousPost || nextPost)
    {
        return (
            <ul className="flex flex-row justify-around mt-10">
                {nextPost && (
                    <li className="text-xl p-3 hover:bg-gray-200 rounded">
                        <Link to={nextPost.fields.slug} rel="next">
                            ← {nextPost.frontmatter.title}
                        </Link>
                    </li>
                )}
                {previousPost && (
                    <li className="text-xl p-3 hover:bg-gray-200 rounded">
                        <Link to={previousPost.fields.slug} rel="prev">
                            {previousPost.frontmatter.title} →
                        </Link>
                    </li>
                )}
            </ul>
        );
    }
}

export default SwitchPostNavigation;
