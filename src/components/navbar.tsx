import React, { useEffect, useState } from 'react';
import { IntlShape, useIntl } from 'gatsby-plugin-intl';
import Link from 'next/link';
import styled from 'styled-components';

import config from '~/config';
import { EUrlType } from '~/utils/createPathFromSlug';
import theme from '~/styles/theme';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [pathname, setPathname] = useState('');
    // TODO: useRouter
    useEffect(() => {
        setPathname(window.location.pathname);
    }, [pathname]);

    const intl: IntlShape = useIntl();

    return (
        <StyledNav>
            <StyledNavMenu>
                <Link href="/">
                    <StyledLogo
                        src={'/img/logo_oneline.png'}
                        alt={config.siteTitle}
                        width="200"
                    />
                </Link>
                <StyledBurgerMenuDiv>
                    <StyledBurgerMenuButton
                        type="button"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle burger menu"
                    >
                        <StyledBurgerMenuIcon viewBox="0 0 24 24">
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
                        </StyledBurgerMenuIcon>
                    </StyledBurgerMenuButton>
                </StyledBurgerMenuDiv>
            </StyledNavMenu>

            <StyledNavLinkDiv isopen={isOpen ? 'true' : ''}>
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
            </StyledNavLinkDiv>
        </StyledNav>
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

const StyledNavLinkDiv = styled.div`
    border-top-width: 1px;
    border-color: ${theme.color.green500};
    padding: 1rem;

    @media (min-width: 640px) {
        display: flex;
        padding: 0;
        border-width: 0;
    }

    ${(props) =>
        props.isopen === 'true' ? `display: block;` : `display: none;`}
`;

const StyledLogo = styled.img`
    color: ${theme.color.black};
`;

const StyledBurgerMenuIcon = styled.svg`
    height: 1.5rem;
    width: 1.5rem;
    fill: currentColor;
`;

const StyledBurgerMenuButton = styled.button`
    display: block;
    padding: 0.25rem;
    border-radius: 0.25rem;
    color: ${theme.color.gray900};

    &:hover {
        background-color: ${theme.color.gray300};
    }

    &:focus {
        outline: 2px solid transparent;
        outline-offset: 2px;
    }
`;

const StyledBurgerMenuDiv = styled.div`
    @media (min-width: 640px) {
        display: none;
    }
`;

const StyledNavMenu = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
    @media (min-width: 640px) {
        padding: 0;
    }
`;

const StyledNav = styled.nav`
    border-bottom-width: 2px;
    border-color: ${theme.color.green500};
    @media (min-width: 640px) {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem;
        height: 4rem;
    }
`;
