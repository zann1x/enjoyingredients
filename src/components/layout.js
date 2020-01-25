import React from "react";
import { useStaticQuery, graphql } from "gatsby";

import Navbar from "./navbar";

const Layout = ({children}) => {
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
            <div className="container flex-grow mx-auto xl:3/5 px-2 py-4">
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

export default Layout;
