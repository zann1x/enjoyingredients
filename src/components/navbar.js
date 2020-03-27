import React from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";

const Navbar = ({ siteTitle }) => {
    let [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-gray-900 sm:flex sm:justify-between sm:items-center sm:px-4 sm:py-6">
            <div className="flex items-center justify-between px-4 py-6 sm:p-0">
                <div className="text-white">
                    <Link to="/"
                        className="font-semibold text-xl hover:bg-gray-800 rounded px-2 py-1 block">
                        {siteTitle}
                    </Link>
                </div>
                <div className="sm:hidden">
                    <button type="button"
                        onClick={() => setIsOpen(!isOpen)}
                        className="block px-1 py-1 rounded text-gray-500 hover:bg-gray-800 hover:text-white focus:text-white focus:outline-none">
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

            <div className={`${isOpen ? "block" : "hidden"} px-2 pt-2 pb-4 sm:flex sm:p-0`}>
                <Link to="/blog/categories"
                    className="mt-1 block px-2 py-1 text-white font-semibold rounded hover:bg-gray-800">
                    Kategorien
                </Link>
                <Link to="/about"
                    className="mt-1 block px-2 py-1 text-white font-semibold rounded hover:bg-gray-800 sm:mt-0 sm:ml-2">
                    Über mich
                </Link>
            </div>
        </nav>
    );
}

Navbar.propTypes = {
    siteTitle: PropTypes.string.isRequired,
};

export default Navbar;
