import styled from '@emotion/styled';

export const Shape = styled.div`
    position: absolute;
    display: block;
    height: 100rem;
    width: 40rem;
    border-radius: 100%;
    animation: spiral 30s ease-in-out infinite alternate;
    opacity: 0;
`;

export const ShapeContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    z-index: -1;
    overflow: hidden;
`;
