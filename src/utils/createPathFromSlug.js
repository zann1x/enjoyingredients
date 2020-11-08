const EUrlType = {
    STARTPAGE: '/',
    ABOUT: '/about/',
    BLOG_POST: '/blog/posts/',
    BLOG_RECIPES: '/blog/recipes/',
    PAGE: '/'
};

function createIdPathFromSlug(urlType, slug) {
    return urlType + '#' + slug;
}

function createPathFromSlug(urlType, slug) {
    return urlType + slug + '/';
}

module.exports = {
    EUrlType,
    createIdPathFromSlug,
    createPathFromSlug,
};
