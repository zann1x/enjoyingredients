import React from "react";
import PropTypes from "prop-types";
import { Link, useIntl } from "gatsby-plugin-intl";
import styled from "styled-components";

import theme from "~styles/theme";
import { createIdPathFromSlug, EUrlType } from "~utils/createPathFromSlug";
import { mapCategoryNameToI18nKey } from "~utils/mapCategoryNameToI18nKey";

export const CategoryButtonList = ({ categories }) => {
    const intl = useIntl();

    if (categories.length) {
        return (
            <StyledCategoryList>
                <span>{intl.formatMessage({ id: "navbar_categories" })}: </span>
                {categories.map(category => {
                    const categoryUrl = createIdPathFromSlug(EUrlType.BLOG_CATEGORY, category.slug);
                    const i18nCategoryName = mapCategoryNameToI18nKey(category.name);
                    if (i18nCategoryName !== '') {
                        // TODO: key attribute at the Link element does somehow not get recognized
                        return (
                            <Link key={category.id} to={categoryUrl} className="inline-block px-3 py-1 mx-1 text-sm font-semibold text-gray-700 underline">
                                {intl.formatMessage({ id: i18nCategoryName })}
                            </Link>
                        );
                    } else {
                        // TODO: log somewhere
                        return '';
                    }
                })}
            </StyledCategoryList>
        );
    }

    return null;
}

CategoryButtonList.propTypes = {
    categories: PropTypes.arrayOf(PropTypes.object),
};

export default CategoryButtonList;

const StyledCategoryList = styled.div`
    color: ${theme.color.gray700};
    font-size: ${theme.fontSize.sm};
    padding: 1rem 0 1rem 0;
`;
