import React from "react";
import { Link } from "gatsby-plugin-intl";
import PropTypes from "prop-types";
import { createPathFromSlug, EUrlType } from "~utils/createPathFromSlug";

const SwitchPostNavigation = ({ previousPost, nextPost }) => {
    return (
        <StyledList>
            {previousPost && (
                <StyledListItem>
                    <Link to={createPathFromSlug(EUrlType.BLOG_POST, previousPost.slug)} rel="prev">
                        ← {previousPost.title}
                    </Link>
                </StyledListItem>
            )}
            {nextPost && (
                <StyledListItem>
                    <Link to={createPathFromSlug(EUrlType.BLOG_POST, nextPost.slug)} rel="next">
                        {nextPost.title} →
                    </Link>
                </StyledListItem>
            )}
        </StyledList>
    );
}

SwitchPostNavigation.propTypes = {
    previousPost: PropTypes.object,
    nextPost: PropTypes.object,
};

export default SwitchPostNavigation;


const StyledList = styled.ul`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    margin-top: 2.5rem;
`;

const StyledListItem = styled.li`
    font-size: 1.25rem;
    padding: 0.75rem;
    border-radius: 0.25rem;
    &:hover {
        background-color: #edf2f7;
    }
`;
