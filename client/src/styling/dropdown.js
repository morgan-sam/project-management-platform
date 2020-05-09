import { calculateColorStyles, getHoverTextColor } from 'styling/theme';

const DROPDOWN_HEIGHT_REMS = 2;
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
	width: 'inherit',
	position: 'absolute',
	top: '50%',
	transform: `translateY(-${DROPDOWN_HEIGHT_REMS / 2}rem)`
};

export const dropdownHeaderStyle = (listOpen) => {
	return {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		width: 'inherit',
		borderRadius: listOpen ? `${DROPDOWN_BORDER_RADIUS} ${DROPDOWN_BORDER_RADIUS} 0 0` : DROPDOWN_BORDER_RADIUS
	};
};

export const dropdownClosedStyle = (listOpen) => {
	return {
		cursor: 'pointer',
		maxHeight: `${DROPDOWN_HEIGHT_REMS}rem`,
		overflow: 'hidden',
		width: 'inherit',
		border: '1px solid black',
		borderBottom: listOpen ? 'none' : '1px solid black',
		transition: '0s borderBottom',
		borderRadius: DROPDOWN_BORDER_RADIUS
	};
};

export const dropdownOpenStyle = () => {
	return {
		cursor: 'pointer',
		maxHeight: '20rem',
		overflowY: 'scroll',
		width: 'inherit',
		border: '1px solid black',
		borderRadius: `${DROPDOWN_BORDER_RADIUS} ${DROPDOWN_BORDER_RADIUS} 0 0`
	};
};

export const dropdownBoxStyle = (themeColor, state) => {
	const { listOpen, hovered } = state;
	return {
		boxSizing: 'content-box',
		height: `${DROPDOWN_HEIGHT_REMS}rem`,
		border: 'none',
		borderBottom: listOpen ? '1px solid black' : 'none',
		background: '#fff',
		zIndex: '0',
		textAlign: 'center',
		userSelect: 'none',
		width: 'inherit',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		...(hovered ? getHoveredStyle(themeColor) : null)
	};
};

const getHoveredStyle = (color) => {
	const colors = calculateColorStyles(color);
	return {
		background: `radial-gradient(rgb(${colors[0].join(',')}),rgb(${colors[0].join(',')}), rgb(${colors[1].join(
			','
		)}))`,
		filter: 'brightness(110%) contrast(80%)',
		color: getHoverTextColor(color)
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
