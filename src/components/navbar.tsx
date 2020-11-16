import React, { useEffect, useState } from 'react';
import { IntlShape, Link, useIntl } from 'gatsby-plugin-intl';
import styled from 'styled-components';

import { EUrlType } from '~utils/createPathFromSlug';

import theme from '~styles/theme';

const Navbar = ({ siteTitle }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [pathname, setPathname] = useState('');
    useEffect(() => {
        setPathname(window.location.pathname);
    }, [pathname]);

    const intl: IntlShape = useIntl();

    // TODO: replace styles with styled components
    return (
        <nav className="border-b-2 border-green-500 sm:flex sm:justify-between sm:items-center sm:px-4 sm:py-4 sm:h-16">
            <div className="flex items-center justify-between px-4 py-4 sm:p-0">
                <Link to="/" className="flex">
                    <img
                        style={{ color: 'black' }}
                        src={'/img/logo_oneline.png'}
                        alt={siteTitle}
                        width="200"
                    />
                </Link>
                <div className="sm:hidden">
                    <button
                        type="button"
                        onClick={() => setIsOpen(!isOpen)}
                        className="block px-1 py-1 rounded text-gray-900 hover:bg-gray-300 focus:outline-none"
                        aria-label="Toggle burger menu"
                    >
                        <svg
                            className="h-6 w-6 fill-current"
                            viewBox="0 0 24 24"
                        >
                            {isOpen ? (
                                // Closed burger menu displaying the three dashes
                                <path
                                    fillRule="evenodd"
                                    d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
                                />
                            ) : (
                                // Opened burger menu displaying an X
                                <path
                                    fillRule="evenodd"
                                    d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                                />
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            <div
                className={`${
                    isOpen ? 'block' : 'hidden'
                } border-t border-green-500 sm:border-0 px-4 py-4 sm:flex sm:p-0`}
            >
                <StyledNavLink
                    to={EUrlType.ABOUT}
                    isselected={pathname.endsWith(EUrlType.ABOUT) ? 'true' : ''}
                >
                    {intl.formatMessage({ id: 'navbar_about' })}
                </StyledNavLink>
                <StyledNavLink
                    to={EUrlType.BLOG_RECIPES}
                    isselected={
                        pathname.endsWith(EUrlType.BLOG_RECIPES) ? 'true' : ''
                    }
                >
                    {intl.formatMessage({ id: 'navbar_recipes' })}
                </StyledNavLink>
            </div>
        </nav>
    );
};

export default Navbar;

const StyledNavLink = styled(Link)`
    display: block;
    padding: 0.25rem 0.5rem;
    color: ${theme.color.black};
    font-weight: ${theme.fontWeight.f600};
    border-radius: 0.25rem;

    &:hover {
        background-color: ${theme.color.gray300};
    }
    &:last-of-type {
        margin-top: 0.25rem;

        @media (min-width: 640px) {
            margin-top: 0;
            margin-left: 0.5rem;
        }
    }

    ${(props) =>
        props.isselected === 'true' &&
        `
        text-decoration: underline;
    `}
`;
