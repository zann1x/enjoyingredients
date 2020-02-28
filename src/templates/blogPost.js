import React from "react";
import { graphql } from "gatsby";

import Content from "~components/layout/content.js";
import SEO from "~components/seo.js";
import CategoryButton from "~components/categoryButton";
import { cleanInternalTags } from "~utils/cleanInternalTags";
import PropTypes from "prop-types";

const CategoryButtonList = ({ categories }) => {
    if (categories.length) {
        return (
            <p className="text-sm pt-6 text-gray-600">
                <span>Kategorien: </span>
                { categories.map(category => {
                    return (
                        <CategoryButton
                            key={category.slug}
                            category={category}
                        ></CategoryButton>
                    );
                })}
            </p>
        );
    }

    return null;
}

CategoryButtonList.propTypes = {
    categories: PropTypes.arrayOf(PropTypes.object),
};

const BlogPost = ({ data: { post }, location }) => {
    // const categories = post.tags.filter(tag => {
    //     if (tag.name.startsWith('cat-'))
    //         return cleanInternalTags(tag, 'cat');
    //     else
    //         return null;
    // });

    const categories = post.tags;
    console.log(categories);

    return (
        <Content>
            <SEO
                title={post.title}
                description={post.custom_excerpt || post.excerpt}
                pathname={location.pathname}
            />
            <article>
                <header className="pb-4">
                    <h1 className="text-3xl font-bold">{post.title}</h1>
                    <p className="text-sm">{post.published_at}</p>
                </header>
                <section dangerouslySetInnerHTML={{ __html: post.html }} />
                <CategoryButtonList categories={categories} />
            </article>
        </Content>
    );
}

BlogPost.propTypes = {
    post: PropTypes.object,
    location: PropTypes.object,
};

export default BlogPost;

export const pageQuery = graphql`
    query ($slug: String!) {
        post: ghostPost(slug: {eq: $slug} ) {
            ...GhostPostFields
        }
    }
`;
