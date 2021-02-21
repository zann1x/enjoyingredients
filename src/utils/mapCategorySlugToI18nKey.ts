export function mapCategorySlugToI18nKey(slug: string): string {
    switch (slug) {
        case 'desserts':
            return 'category_desserts';
        case 'fish-meat':
            return 'category_fish_and_meat';
        case 'breakfast':
            return 'category_breakfast';
        case 'pastries':
            return 'category_pastries';
        case 'savory-pastries':
            return 'category_pastries_savory';
        case 'sweet-pastries':
            return 'category_pastries_sweet';
        case 'drinks':
            return 'category_drinks';
        case 'pasta-pizza':
            return 'category_pasta_and_pizza';
        case 'appetizers':
            return 'category_appetizers';
        default:
            return 'category_none';
    }
}
