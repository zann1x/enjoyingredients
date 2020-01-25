import React from "react"
import { Link } from "gatsby"

class Navbar extends React.Component {
    render() {
        const siteTitle = this.props.siteTitle

        return (
            <nav className="flex items-center flex-wrap bg-pink-500 p-4">
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
            </nav>
        )
    }
}

export default Navbar
