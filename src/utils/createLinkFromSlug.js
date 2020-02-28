const config = require('./config');

const EUrlType = {
    BLOG_POST: '/blog/posts/',
    BLOG_CATEGORY: '/blog/categories/',
}

function createPathFromSlug(urlType, slug) {
    return urlType + slug + '/';
}

function createLinkFromSlug(urlType, slug) {
    return config.siteUrl + createPathFromSlug(urlType, slug);
}

module.exports = {
    EUrlType,
    createPathFromSlug,
    createLinkFromSlug,
};
