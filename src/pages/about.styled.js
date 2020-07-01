import styled from "styled-components";
import theme from "~styles/theme";

export const Heading = styled.h1`
    font-size: ${theme.fontSize.h1};
    font-weight: ${theme.fontWeight.f700};

    padding-bottom: 0.5rem;
`;

export const ContentSection = styled.section`
    line-height: 1.625;
    text-align: justify;
`;
