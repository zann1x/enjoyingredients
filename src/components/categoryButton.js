import React from "react";
import { Link, useIntl } from "gatsby-plugin-intl";
import PropTypes from "prop-types";

import { createIdPathFromSlug, EUrlType } from "~utils/createPathFromSlug";
import { mapCategoryNameToI18nKey } from "~utils/mapCategoryNameToI18nKey";

const CategoryButton = ({ category }) => {
    const intl = useIntl();
    const categoryPath = createIdPathFromSlug(EUrlType.BLOG_CATEGORY, category.slug);
    const i18nCategoryName = mapCategoryNameToI18nKey(category.name);
    if (i18nCategoryName !== '') {
        return (
            <Link to={categoryPath}
                className="inline-block rounded-full px-3 py-1 m-1 text-sm font-semibold text-gray-700 bg-gray-200 hover:bg-gray-300">
                {intl.formatMessage({ id: i18nCategoryName })}
            </Link>
        );
    } else {
        // TODO: log somewhere
        return '';
    }
}

CategoryButton.propTypes = {
    category: PropTypes.shape({
        slug: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
    }),
};

export default CategoryButton;
