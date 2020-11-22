import { calculateColorStyles, getGradientTextColor } from 'styling/theme';
import styled from '@emotion/styled';

export const DROPDOWN_HEIGHT_REMS = 2;
export const DROPDOWN_MAX_HEIGHT_REMS = 20;
const DROPDOWN_BORDER_RADIUS = '5px';

export const dropdownParentStyle = {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    position: 'relative',
    boxSizing: 'border-box'
};

export const dropdownElementStyle = {
    height: `${DROPDOWN_HEIGHT_REMS}rem`,
    width: 'inherit',
    position: 'absolute',
    top: '50%',
    transform: `translateY(-${DROPDOWN_HEIGHT_REMS / 2}rem)`
};

export const dropdownHeaderStyle = (listOpen) => {
    return {
        position: 'relative',
        height: `${DROPDOWN_HEIGHT_REMS}rem`,

        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 'inherit',
        borderRadius: listOpen
            ? `${DROPDOWN_BORDER_RADIUS} ${DROPDOWN_BORDER_RADIUS} 0 0`
            : DROPDOWN_BORDER_RADIUS
    };
};

export const DropdownOptionContainer = styled.div`
    scrollbar-width: none; /* For Firefox */
    -ms-overflow-style: none; /* For Internet Explorer and Edge */
    transition: 1s;
    &::-webkit-scrollbar {
        width: 0px; /* For Chrome, Safari, and Opera */
    }
    ${(props) => (props.listOpen ? DropdownOpen : DropdownClosed)}
`;

const DropdownOpen = `
    position: relative;
    cursor: pointer;
    max-height: ${DROPDOWN_MAX_HEIGHT_REMS}rem;
    overflow-y: scroll;
    width: inherit;
    border: 1px solid black;
    border-radius: ${DROPDOWN_BORDER_RADIUS} ${DROPDOWN_BORDER_RADIUS} 0 0
`;

const DropdownClosed = `
    position: relative;
    cursor: pointer;
    max-height: ${DROPDOWN_HEIGHT_REMS}rem;
    width: inherit;
    border-top: 1px solid black;
    border-left: 1px solid black;
    border-right: 1px solid black;
    border-bottom: 1px solid black;
    transition: 0s borderBottom;
    border-radius: ${DROPDOWN_BORDER_RADIUS}
`;

export const dropdownBoxStyle = (listOpen) => {
    return {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        boxSizing: 'content-box',
        height: `${DROPDOWN_HEIGHT_REMS}rem`,
        border: 'none',
        borderBottom: listOpen ? '1px solid black' : 'none',
        background: '#fff',
        zIndex: '0',
        textAlign: 'center',
        userSelect: 'none',
        width: 'inherit',
        overflow: 'hidden'
    };
};

export const optionBackgroundStyle = {
    position: 'absolute',
    height: `100%`,
    width: '100%'
};

export const getHoveredStyle = (color) => {
    return {
        background: getOptionGradientStyle(color),
        filter: 'brightness(110%) contrast(80%) saturate(110%)',
        zIndex: '-1',
        animation:
            'dropdown-bg-rotate 14s cubic-bezier(0,1.02,.69,-0.27) alternate infinite',
        transition: 'opacity 0.05s'
    };
};

export const getDefaultStyle = (color) => {
    return {
        background: getOptionGradientStyle(color),
        filter: 'brightness(110%) contrast(80%) saturate(80%) opacity(80%)',
        zIndex: '-1',
        animation:
            'dropdown-bg-rotate 14s cubic-bezier(0,1.02,.69,-0.27) alternate infinite',
        transition: 'opacity 0.05s'
    };
};

export const getOptionGradientStyle = (color) => {
    const colors = calculateColorStyles(color);
    return `radial-gradient(rgb(${colors[0].join(',')}),rgb(${colors[1].join(
        ','
    )}))`;
};

export const getDropdownTextStyle = (themeColor, hover) => {
    return {
        color: hover ? getGradientTextColor(themeColor) : '#000'
    };
};

export const optionStyle = {
    borderTop: 'none',
    width: 'inherit',
    boxSizing: 'border-box'
};

export const finalOptionStyle = {
    borderBottom: 'none',
    width: 'inherit',
    boxSizing: 'border-box'
};

export const dropdownEndNode = {
    border: '1px solid black',
    boxSizing: 'content-box',
    borderRadius: `0 0 ${DROPDOWN_BORDER_RADIUS} ${DROPDOWN_BORDER_RADIUS}`
};
