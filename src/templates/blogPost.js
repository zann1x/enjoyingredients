import React from "react";
import { graphql } from "gatsby";
import { useIntl } from "gatsby-plugin-intl";
import PropTypes from "prop-types";

import * as Style from "./blogPost.style";

import CategoryButton from "~components/categoryButton";
import SEO from "~components/seo";
import CenteredContent from "~layouts/centeredContent";
import SiteLayout from "~layouts/siteLayout";

import FallbackFeatureImage from "~content/img/fallback-feature-img.jpg";

export const BlogPost = ({ data: { post }, location }) => {
    const intl = useIntl();
    const categories = post.tags;
    const header_image = post.feature_image !== null ? post.feature_image : FallbackFeatureImage;

    return (
        <SiteLayout>
            <SEO
                title={post.title}
                description={post.custom_excerpt || post.excerpt}
                pathname={location.pathname}
            />

            <Style.StyledHeroImage style={{backgroundImage: `url(${header_image})`}} />
            <CenteredContent>
                <article>
                    <header>
                        <Style.StyledPostHeading>{post.title}</Style.StyledPostHeading>
                        <Style.StyledPublishingDate>{intl.formatDate(post.published_at, { day: 'numeric', month: 'long', year: 'numeric' })}</Style.StyledPublishingDate>
                        {post.custom_excerpt &&
                            <Style.StyledPostExcerpt className="post-content">{post.custom_excerpt}</Style.StyledPostExcerpt>
                        }
                    </header>
                    <hr/>
                    <Style.StyledPostContent className="load-external-scripts" dangerouslySetInnerHTML={{ __html: post.html }} />
                    <Style.StyledEndPostDiv />
                    {/* <CategoryButtonList categories={categories} /> */}
                    <div className="py-4">
                        {categories.map(category => {
                            return (
                                <CategoryButton
                                    key={category.id}
                                    category={category}
                                ></CategoryButton>
                            );
                        })}
                    </div>
                </article>
            </CenteredContent>
        </SiteLayout>
    );
}

BlogPost.propTypes = {
    post: PropTypes.object,
    location: PropTypes.object,
};

export default BlogPost;

// TODO: only source data that is really need
export const pageQuery = graphql`
    query ($slug: String!) {
        post: ghostPost(slug: {eq: $slug} ) {
            ...GhostPostFields
        }
    }
`;
