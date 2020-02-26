function cleanInternalTags(tag, prefix) {
    tag.slug = tag.slug.replace('hash-' + prefix + '-', '');
    tag.name = tag.name.replace(prefix + '-', '');
    return tag;
}
