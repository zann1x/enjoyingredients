import React from "react";
import { Link, useIntl } from "gatsby-plugin-intl";
import PropTypes from "prop-types";

import { createIdPathFromSlug, EUrlType } from "~utils/createPathFromSlug";
import { mapCategoryNameToI18nKey } from "~utils/mapCategoryNameToI18nKey";
import styled from "styled-components";

const CategoryButton = ({ category }) => {
    const intl = useIntl();
    const categoryPath = createIdPathFromSlug(EUrlType.BLOG_CATEGORY, category.slug);
    const i18nCategoryName = mapCategoryNameToI18nKey(category.name);
    if (i18nCategoryName !== '') {
        return (
            <StyledLink to={categoryPath}>
                {intl.formatMessage({ id: i18nCategoryName })}
            </StyledLink>
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

const StyledLink = styled(props => <Link {...props} />)`
    display: inline-block;
    border-radius: 9999px;
    padding: 0.25rem 0.75rem;
    margin: 0.25rem;
    font-size: .875rem;
    font-weight: 600;
    color: #4a5568;
    background-color: #edf2f7;
    &:hover {
        background-color: #e2e8f0;
    }
`;
