import React from "react";
import { graphql } from "gatsby";
import PropTypes from "prop-types";

import * as Style from "./style";

import CenteredContent from "~components/layout/centeredContent";
import CategoryButtonList from "~components/CategoryButtonList";
import SEO from "~components/seo";
import SiteLayout from "~components/layout/siteLayout";

import FallbackFeatureImage from "~content/img/fallback-feature-img.jpg";

export const BlogPost = ({ data: { post }, location }) => {
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
                        <Style.StyledPublishingDate>{post.published_at_pretty}</Style.StyledPublishingDate>
                        {post.custom_excerpt &&
                            <Style.StyledPostExcerpt className="post-content">{post.custom_excerpt}</Style.StyledPostExcerpt>
                        }
                    </header>
                    <hr/>
                    <Style.StyledPostContent dangerouslySetInnerHTML={{ __html: post.html }} />
                    <Style.StyledEndPostDiv />
                    <CategoryButtonList categories={categories} />
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

export const pageQuery = graphql`
    query ($slug: String!) {
        post: ghostPost(slug: {eq: $slug} ) {
            ...GhostPostFields
        }
    }
`;
