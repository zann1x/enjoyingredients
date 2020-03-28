import React from "react";
import { Link } from "gatsby-plugin-intl";
import PropTypes from "prop-types";
import { createPathFromSlug, EUrlType } from "~utils/createPathFromSlug";

const SwitchPostNavigation = ({ previousPost, nextPost }) => {
    return (
        <ul className="flex flex-row justify-around mt-10">
            {previousPost && (
                <li className="text-xl p-3 hover:bg-gray-200 rounded">
                    <Link to={createPathFromSlug(EUrlType.BLOG_POST, previousPost.slug)} rel="prev">
                        ← {previousPost.title}
                    </Link>
                </li>
            )}
            {nextPost && (
                <li className="text-xl p-3 hover:bg-gray-200 rounded">
                    <Link to={createPathFromSlug(EUrlType.BLOG_POST, nextPost.slug)} rel="next">
                        {nextPost.title} →
                    </Link>
                </li>
            )}
        </ul>
    );
}

SwitchPostNavigation.propTypes = {
    previousPost: PropTypes.object,
    nextPost: PropTypes.object,
};

export default SwitchPostNavigation;
