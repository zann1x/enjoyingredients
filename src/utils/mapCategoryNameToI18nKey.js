export function mapCategoryNameToI18nKey(categoryName, locale) {
    if (locale === 'de') {
        switch (categoryName) {
            case 'Desserts':
                return 'category_desserts';
            case 'Fisch & Fleisch':
                return 'category_fish_and_meat';
            case 'Frühstück':
                return 'category_breakfast';
            case 'Gebäck':
                return 'category_pastries';
            case 'Getränke':
                return 'category_drinks';
            case 'Pasta & Pizza':
                return 'category_pasta_and_pizza';
            case 'Vorspeisen':
                return 'category_appetizers';
            case 'Getting Started':
                return 'category_getting_started';
            default:
                return 'category_none';
        }
    }
}
