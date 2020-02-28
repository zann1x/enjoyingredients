const config = require('./config');

const EUrlType = {
    BLOG_POST: '/blog/',
    BLOG_CATEGORY: '/blog/categories/',
}

function createPathFromSlug(urlType, slug) {
    const url = urlType + slug;
    return url;
}

function createLinkFromSlug(urlType, slug) {
    const url = config.siteUrl + urlType + slug;
    return url;
}

module.exports = {
    EUrlType,
    createPathFromSlug,
    createLinkFromSlug,
};
