import styled from '@emotion/styled';

export const Screen = styled.div`
    position: absolute;
    height: 100%;
    width: 100%;
    left: 0;
    top: 0;
    overflow-y: ${(props) => (props.fixedStyle ? 'hidden' : 'scroll')};
`;

export const MainPage = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 75vw;
    margin: 0 auto;
    padding: 2.6rem;
    box-sizing: border-box;
    overflow: ${(props) => (props.scrollLocked ? 'hidden' : 'visible')};
`;

export const Overlay = styled.div`
    @keyframes overlay-fade-in {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 0.8;
        }
    }
    height: 100vw;
    width: 100vw;
    background: white;
    opacity: 0.8;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 19;
    animation: overlay-fade-in linear 0.4s;
`;

export const TableContainer = styled.div`
    @keyframes table-fixed-view-toggle {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }

    ${(props) =>
        props.fixedStyle
            ? `
    padding: 4rem;
    display: flex;
    justify-content: center;
    width: 100%;
    height: ${600 - props.barConHeight}px;
    overflow-y: scroll;
    transition: ${
        Object.values(props.displayedBars).includes(true)
            ? '0.2s ease-in-out'
            : '0.5s ease-in-out'
    },
    -webkit-mask-image:
        linear-gradient(to bottom, transparent 0%, white 10%, white 90%, transparent 100%);
    mask-image:
        linear-gradient(to bottom, transparent 0%, white 10%, white 90%, transparent 100%);
    animation: table-fixed-view-toggle 2s ease-in-out;
    `
            : `
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100%;
    `}
`;

export const TopBarsContainer = styled.div`
    margin: 0rem 0 2rem 0;
    ${[...Array(3)].map(
        (el, i) => `& > *:nth-child(${i + 1}) {
        z-index: ${9 - i};
    }`
    )}
    ${(props) =>
        props.barsAtTop
            ? `position: sticky;
               top: 4rem;`
            : `position: relative;
               top: 0rem;`}
`;
