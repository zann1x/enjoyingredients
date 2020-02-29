import React from "react";
import { useStaticQuery, graphql } from "gatsby";

import Navbar from '~components/navbar.js';

const Home = ({children}) => {
    const data = useStaticQuery(
        graphql`
            query {
                site {
                    siteMetadata {
                        title
                    }
                }
            }
        `
    );

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar siteTitle={data.site.siteMetadata.title}></Navbar>
            <div className="container mx-auto flex-grow px-2 py-4 w-11/12 sm:w-10/12 md:w-8/12 lg:w-7/12 xl:w-6/12">
                {children}
            </div>
            <footer className="text-sm text-center py-2">
                <p>
                    © {new Date().getFullYear()} | <a href="https://lukaszanner.de">Mit Hunger gemacht</a>
                </p>
            </footer>
        </div>
    );
}

export default Home;
