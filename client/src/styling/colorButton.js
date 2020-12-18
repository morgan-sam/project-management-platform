import styled from '@emotion/styled';
import { calculateColorStyles, getGradientTextColor } from 'styling/theme';

export const BUTTON_BOUNCE_PX = 8;

const getButtonSizes = (style) => {
    return {
        width: style && style.width ? style.width : 'auto',
        height: style && style.height ? style.height : 'auto'
    };
};

export const ColorButtonStaticContainer = styled.div`
    position: relative;
    min-height: 2rem;
    height: 'auto';
    display: flex;
    align-items: center;
    margin: 0.5rem;
    animation: ${(props) =>
        props.shake ? 'button-error-shake 0.2s ease-in-out infinite' : 'none'};
`;

export const getFloatingContainerStyle = (style, state) => {
    const { width, height } = getButtonSizes(style);
    const { pressed, hover } = state;
    return {
        position: 'relative',
        width,
        height,
        top: pressed
            ? `${BUTTON_BOUNCE_PX}px`
            : hover
            ? `-${BUTTON_BOUNCE_PX}px`
            : '0',
        transition: 'top 0.2s ease-in-out',
        animation: hover
            ? 'float 1.4s ease-in-out 0.4s alternate infinite'
            : 'none',
        overflow: 'hidden',

        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    };
};

export const getButtonStyle = (props, hover) => {
    const { style, color, enabled } = props;
    const { width, height } = getButtonSizes(style);
    const hoverTextColor = getGradientTextColor(color);

    return {
        position: 'relative',
        width,
        height,
        padding: '0.75rem',
        backgroundColor: 'transparent',
        border: '1px solid black',
        color: hover ? hoverTextColor : 'black',
        transition: '0s cubic-bezier(.11,.31,.92,.05)',
        cursor: enabled ? 'pointer' : 'not-allowed'
    };
};

export const ColorBox = styled.div`
    @keyframes button-bg-rotate {
        0% {
            transform: rotate(0deg) scale(4) skew(45deg);
        }
        25% {
            transform: rotate(90deg) scale(4) skew(45deg);
        }
        50% {
            transform: rotate(180deg) scale(4) skew(45deg);
        }
        100% {
            transform: rotate(270deg) scale(4) skew(45deg);
        }
    }
    position: absolute;
    width: 150%;
    height: 150%;
    z-index: -2;
    transform-origin: center;
    transform: ${(props) =>
        props.hover
            ? 'translate(0%, 0%) scale(2) skew(0deg)'
            : 'translate(0%, 400%) scale(2) skew(45deg)'};
    border-radius: 0;
    transition: 0s transform ease-in-out;
    background: ${(props) => getButtonGradient(props.color)};
    opacity: 100%;
    animation: ${(props) =>
        props.hover
            ? 'button-bg-rotate 5s cubic-bezier(0,.09,1,-0.09) 0s infinite alternate-reverse'
            : 'none'};
}`;

const getButtonGradient = (color) => {
    const colors = calculateColorStyles(color);
    return `radial-gradient(circle, rgb(${colors[0].join(
        ','
    )}) 0%, rgb(${colors[1].join(',')}) 48%, rgb(${colors[2].join(',')}) 100%)`;
};

export const WhiteBox = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: white;
    z-index: -3;
`;
