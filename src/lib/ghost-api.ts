import GhostContentAPI from '@tryghost/content-api';

const config = require('~/../.ghost');

const api = new GhostContentAPI({
    url: config.GHOST_API_URL,
    key: config.GHOST_API_KEY,
    version: 'v3',
});

export async function getPostsForIndexPage() {
    const posts = await api.posts.browse({
        order: 'published_at DESC',
        include: 'tags',
    });

    return posts;
}

export async function getAllPostsWithTags() {
    const posts = await api.posts.browse({
        order: 'published_at DESC',
        include: 'tags',
    });

    return posts;
}

export async function getAllTagsWithPosts() {
    const tags = await api.tags.browse({
        include: 'count.posts',
        order: 'slug ASC',
    });

    return tags.filter((tag) => tag.count.posts > 0);
}

export async function getAllPostsRaw() {
    const posts = await api.posts.browse({
        order: 'published_at DESC',
    });

    return posts;
}

export async function getAllPagesRaw() {
    const pages = await api.pages.browse();

    return pages;
}

export async function getPostBySlug(slug) {
    const post = await api.posts.read({
        slug: slug,
        include: 'tags',
    });

    return post;
}

export async function getPageBySlug(slug) {
    const page = await api.pages.read({
        slug: slug,
        include: 'tags',
    });

    return page;
}
