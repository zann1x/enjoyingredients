import React from 'react';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import styled from 'styled-components';

import { createIdPathFromSlug, EUrlType } from '~/utils/createPathFromSlug';
import { mapCategorySlugToI18nKey } from '~/utils/mapCategorySlugToI18nKey';

interface CategoryButtonProps {
    slug: string;
}

const CategoryButton = ({ slug }: CategoryButtonProps) => {
    const { t } = useTranslation('common');
    const categoryPath: string = createIdPathFromSlug(
        EUrlType.BLOG_RECIPES,
        slug,
    );
    const i18nCategoryName: string = mapCategorySlugToI18nKey(slug);

    if (i18nCategoryName !== '') {
        return (
            <StyledLink href={categoryPath}>
                <a>{t(i18nCategoryName)}</a>
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
