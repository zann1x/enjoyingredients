import React from "react";
import CategoryButton from "~components/categoryButton";
import PropTypes from "prop-types";
import styled from "styled-components";
import theme from "~styles/theme";

export const CategoryButtonList = ({ categories }) => {
    if (categories.length) {
        return (
            <StyledCategoryList>
                <span>Kategorien: </span>
                {categories.map(category => {
                    return (
                        <CategoryButton
                            key={category.id}
                            category={category}
                        ></CategoryButton>
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
