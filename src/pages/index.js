import React from "react";
import { graphql, Link } from "gatsby";
import config from '~utils/config';

import Navbar from "~components/navbar.js";
import SEO from "~components/seo.js";
import { createPathFromSlug, EUrlType } from "~utils/createLinkFromSlug";

const Index = ({ data: { about, categories, site }}) => {
    return (
        <div className="min-h-screen">
            <SEO 
                title="The other food blog"
                description={config.siteDescription}
                pathname="/"
            />
            <Navbar siteTitle={site.siteMetadata.title} />

            <div className="py-4 min-w-full">
                <h1 className="text-center text-6xl font-bold ">ENJOYINGREDIENTS</h1>

                <div className="flex">
                    <div className="w-2/3 my-auto mx-auto">
                        <h2>Über mich</h2>
                        <section dangerouslySetInnerHTML={{ __html: about.html }}></section>
                    </div>
                    <div className="w-1/3 text-center my-auto">
                        img
                    </div>
                </div>

                {categories.nodes.map((category, index) => {
                    const categoryName = category.name;
                    const categorySlug = category.slug;
                    const categoryUrl = createPathFromSlug(EUrlType.BLOG_CATEGORY, categorySlug);

                    if (index % 2 === 0) {
                        return (
                            <div key={category.id} className="flex bg-blue-200">
                                <div className="w-2/3 text-center my-auto">
                                    img
                                </div>
                                <Link to={categoryUrl} className="w-1/3 my-auto text-justify">
                                    <h2>{categoryName}</h2>
                                    <section>Beschreibung der Kategorie</section>
                                </Link>
                            </div>
                        );
                    } else {
                        return (
                            <div key={category.id} className="flex bg-green-200">
                                <Link to={categoryUrl} className="w-1/3 my-auto text-justify">
                                    <h2>{categoryName}</h2>
                                    <section>Beschreibung der Kategorie</section>
                                </Link>
                                <div className="w-2/3 text-center my-auto">
                                    img
                                </div>
                            </div>
                        );
                    }
                })}
            </div>
            
            <footer className="text-sm text-center my-2">
                <p>
                    © {new Date().getFullYear()} | <a href="https://lukaszanner.de">Mit Hunger gemacht</a>
                </p>
            </footer>
        </div>
    );
}

export default Index;

export const pageQuery = graphql`
    query {
        site {
            siteMetadata {
                title
            }
        }
        about: markdownRemark(
            fields: {
                slug: { eq: "/about/" }
            }) {
            id
            frontmatter {
                title
            }
            html
        }

        categories: allGhostTag {
            nodes {
                id
                slug
                name
            }
        }
    }
`;
