import React from "react";
import { useState } from "react";
import { Link, useIntl } from "gatsby-plugin-intl";

import { EUrlType } from "~utils/createPathFromSlug";

const Navbar = ({ siteTitle }) => {
    let [isOpen, setIsOpen] = useState(false);
    const intl = useIntl();

    return (
        <nav className="border-b-2 border-green-500 sm:flex sm:justify-between sm:items-center sm:px-4 sm:py-4 h-22">
            <div className="flex items-center justify-between px-4 py-4 sm:p-0">
                <div className="text-white">
                    <Link to="/"
                        className="hover:bg-gray-300 rounded px-2 py-2 block flex">
                            <img style={{color:"black", maxWidth:"200px"}} src={'/img/logo_oneline.png'} alt={siteTitle} />
                    </Link>
                </div>
                <div className="sm:hidden">
                    <button type="button"
                        onClick={() => setIsOpen(!isOpen)}
                        className="block px-1 py-1 rounded text-gray-900 hover:bg-gray-300 focus:outline-none">
                        <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                            {isOpen ? (
                                // Closed burger menu displaying the three dashes
                                <path fillRule="evenodd"
                                    d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z" />
                            ) : (
                                // Opened burger menu displaying an X
                                <path fillRule="evenodd"
                                    d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z" />
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            <div className={`${isOpen ? "block" : "hidden"} border-t border-green-500 sm:border-0 px-4 pt-4 pb-4 sm:flex sm:p-0`}>
                <Link to={EUrlType.BLOG_CATEGORY}
                    className={`block px-2 py-1 text-black font-semibold rounded hover:bg-gray-300 ${window.location.pathname.includes(EUrlType.BLOG_CATEGORY) ? "underline" : ""}`}>
                    {intl.formatMessage({ id: "navbar_categories" })}
                </Link>
                <Link to={EUrlType.ABOUT}
                    className={`block px-2 py-1 text-black font-semibold rounded hover:bg-gray-300 mt-1 sm:mt-0 sm:ml-2 ${window.location.pathname.includes(EUrlType.ABOUT) ? "underline" : ""}`}>
                    {intl.formatMessage({ id: "navbar_about" })}
                </Link>
            </div>
        </nav>
    );
}

export default Navbar;
