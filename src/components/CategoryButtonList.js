import React from "react";
import PropTypes from "prop-types";
import { Link, useIntl } from "gatsby-plugin-intl";
import styled from "styled-components";
import theme from "~styles/theme";
import { createIdPathFromSlug, EUrlType } from "~utils/createPathFromSlug";

export const CategoryButtonList = ({ categories }) => {
    const intl = useIntl();

    if (categories.length) {
        return (
            <StyledCategoryList>
                <span>{intl.formatMessage({ id: "navbar_categories" })}: </span>
                {categories.map(category => {
                    const categoryUrl = createIdPathFromSlug(EUrlType.BLOG_CATEGORY, category.slug);
                    // TODO: key attribute at the Link element does somehow not get recognized
                    return (
                        <Link key={category.id} to={categoryUrl} className="inline-block px-3 py-1 mx-1 text-sm font-semibold text-gray-700 underline">
                            {category.name}
                        </Link>
                    );
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
