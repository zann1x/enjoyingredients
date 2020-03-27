import React from "react";

export const CenteredContent = ({children}) => {
    return (
        <div className="container mx-auto flex-grow px-2 py-4 w-11/12 sm:w-10/12 md:w-8/12 lg:w-7/12 xl:w-6/12">
            {children}
        </div>
    );
}

export default CenteredContent;
