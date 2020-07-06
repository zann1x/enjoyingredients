const EUrlType = {
    ABOUT: '/about/',
    BLOG_POST: '/blog/posts/',
    BLOG_CATEGORY: '/blog/categories/',
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
