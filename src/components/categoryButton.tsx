import React from 'react';
import { IntlShape, useIntl } from 'gatsby-plugin-intl';
import Link from 'next/link';

import { createIdPathFromSlug, EUrlType } from '~/utils/createPathFromSlug';
import { mapCategorySlugToI18nKey } from '~/utils/mapCategorySlugToI18nKey';
import styled from 'styled-components';

interface CategoryButtonProps {
    slug: string;
}

const CategoryButton = ({ slug }: CategoryButtonProps) => {
    const intl: IntlShape = useIntl();
    const categoryPath: string = createIdPathFromSlug(
        EUrlType.BLOG_RECIPES,
        slug,
    );
    const i18nCategoryName: string = mapCategorySlugToI18nKey(slug);

    if (i18nCategoryName !== '') {
        return (
            <StyledLink href={categoryPath}>
                {intl.formatMessage({ id: i18nCategoryName })}
            </StyledLink>
        );
    } else {
        // TODO: log somewhere
        return <></>;
    }
};

export default CategoryButton;

const StyledLink = styled(Link)`
    display: inline-block;
    border-radius: 9999px;
    padding: 0.25rem 0.75rem;
    margin: 0.25rem;
    font-size: 0.875rem;
    font-weight: 600;
    color: #2d3748;
    background-color: #e2e8f0;
    &:hover {
        background-color: #cbd5e0;
    }
`;
