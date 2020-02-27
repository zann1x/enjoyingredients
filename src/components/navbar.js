import React from "react";
import { Link } from "gatsby";
import PropTypes from "prop-types";

const Navbar = ({ siteTitle }) => {
    return (
        <nav className="flex items-center flex-wrap bg-gray-600 p-4">
            {/*
            <div className="flex flex-shrink-0 w-1/3 justify-start items-center text-white">
                <Link to="/" className="bg-green-400 font-semibold text-xl tracking-tight">
                    {siteTitle}
                </Link>
            </div>

            <div className="flex flex-shrink-0 w-1/3 justify-center items-center text-white">
                <Link to="/" className="font-semibold text-xl tracking-tight">
                    Logo
                </Link>
            </div>

            <div className="flex flex-shrink-0 w-1/3 justify-end items-center text-white">
                <Link to="/about" className="block lg:inline-block lg:mt-0 text-gray-200 hover:text-white mr-6">
                    About
                </Link>
            </div>
            */}

            <div className="flex flex-shrink-0 w-1/2 justify-start items-center text-white">
                <Link to="/" className="font-semibold text-xl tracking-tight">
                    {siteTitle}
                </Link>
            </div>

            <div className="flex flex-shrink-0 w-1/2 justify-end items-center text-white">
                <Link to="/about" className="block lg:inline-block lg:mt-0 text-gray-200 hover:text-white mr-6">
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
