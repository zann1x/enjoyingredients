import React from "react";
import { graphql, Link } from "gatsby";

import Navbar from "~components/navbar.js";
import SEO from "~components/seo.js";

const Index = ({ data }) => {
    const { about } = data;
    const { categories } = data;

    return (
        <div className="min-h-screen bg-gray-100">
            <SEO title="The other food blog" />
            <Navbar siteTitle={data.site.siteMetadata.title} />

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

                {categories.edges.map((category, index) => {
                    const categoryTitle = category.node.frontmatter.title;
                    const categorySlug = category.node.fields.slug;

                    if (index % 2 === 0) {
                        return (
                            <div className="flex bg-blue-200">
                                <div className="w-2/3 text-center my-auto">
                                    img
                                </div>
                                <Link to={categorySlug} className="w-1/3 my-auto text-justify">
                                    <h2>{categoryTitle}</h2>
                                    <section>Beschreibung der Kategorie</section>
                                </Link>
                            </div>
                        );
                    } else {
                        return (
                            <div className="flex bg-green-200">
                                <Link to={categorySlug} className="w-1/3 my-auto text-justify">
                                    <h2>{categoryTitle}</h2>
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

        categories: allMarkdownRemark(
            filter: {
                fields: {
                    slug: {
                        regex: "/category/"
                    }
                }
            }) {
            edges {
                node {
                    fields {
                        slug
                    }
                    frontmatter {
                        title
                    }
                }
            }
        }
    }
`;
