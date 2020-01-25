import React from "react";
import Navbar from "./navbar";
import { useStaticQuery, graphql } from "gatsby";

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
        <div>
            <Navbar siteTitle={data.site.siteMetadata.title} />
            <div className="container mx-auto xl:3/5 px-2 py-4">{children}</div>
            <footer>
                <div className="text-sm bottom-0 block text-center py-2">
                    <p>
                        © {new Date().getFullYear()} |
                        Mit <a className="hover:underline hover:text-gray-700" href="https://lukaszanner.de">Hunger</a> gemacht
                    </p>
                </div>
            </footer>
        </div>
    );
}

export default Layout;
