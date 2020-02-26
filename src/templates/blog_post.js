import React from "react";
import { graphql } from "gatsby";

import Content from "~components/layout/content.js";
import SEO from "~components/seo.js";
import CategoryButton from "~components/category_button.js";
import { internalTagCleaner } from "~utils/internal_tag_cleaner.js";

export default (props) => {
    const { post } = props.data;
    const categories = post.tags.filter(tag => {
        if (tag.name.startsWith('cat-')) {
            return internalTagCleaner(tag, 'cat');
            // tag.name = tag.name.replace('cat-', '');
            // tag.slug = tag.slug.replace('hash-cat-', '');
            // return tag;
        }
    });

    console.log(categories);

    return (
        <Content>
            <SEO
                title={post.title}
                description={post.excerpt.substr(0, 160).concat('...')}
                pathname={props.location.pathname}
            />
            <article>
                <header className="pb-4">
                    <h1 className="text-3xl font-bold">{post.title}</h1>
                    <p className="text-sm">{post.published_at}</p>
                </header>
                <section dangerouslySetInnerHTML={{ __html: post.html }} />
                <p className="text-sm pt-6 text-gray-600">
                    <span>Kategorien: </span>
                    {/* {categories.map(category => {
                        return (
                            <CategoryButton
                                key={category.slug}
                                category={category.title}
                            ></CategoryButton>
                        );
                    })} */}
                </p>
            </article>
        </Content>
    );
}

export const pageQuery = graphql`
    query ($slug: String!) {
        post: ghostPost(slug: {eq: $slug} ) {
            ...GhostPostFields
        }
    }
`;
