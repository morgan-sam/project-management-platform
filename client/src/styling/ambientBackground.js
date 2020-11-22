import styled from '@emotion/styled';

export const Shape = styled.div`
    @keyframes spiral {
        0% {
            opacity: 0;
            transform: rotate(0deg) skew(0deg);
        }
        50% {
            transform: rotate(-160deg) skew(20deg);
            opacity: 1;
        }
        75% {
            transform: rotate(-80deg) skew(-10deg);
        }
        100% {
            opacity: 1;
            transform: rotate(0deg) skew(10deg);
        }
    }
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
