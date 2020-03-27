const config = require('./config');

const EUrlType = {
    BLOG_POST: '/blog/posts',
    BLOG_CATEGORY: '/blog/categories',
}

function createIdPathFromSlug(urlType, slug) {
    return urlType + '#' + slug;
}

function createIdLinkFromSlug(urlType, slug) {
    return config.siteUrl + createIdPathFromSlug(urlType, slug);
}

function createPathFromSlug(urlType, slug) {
    return urlType + '/' + slug;
}

function createLinkFromSlug(urlType, slug) {
    return config.siteUrl + createPathFromSlug(urlType, slug);
}

module.exports = {
    EUrlType,
    createIdPathFromSlug,
    createIdLinkFromSlug,
    createPathFromSlug,
    createLinkFromSlug,
};
