export function getNavigatorLanguage() {
    if (navigator.languages && navigator.languages.length) {
        return navigator.languages[0];
    } else {
        return (
            navigator.userLanguage ||
            navigator.language ||
            navigator.browserLanguage ||
            'en'
        );
    }
}
