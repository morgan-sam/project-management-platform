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

export const dropdownClosedStyle = {
	boxSizing: 'border-box',
	cursor: 'pointer',
	maxHeight: `${DROPDOWN_HEIGHT_REMS}rem`,
	overflow: 'hidden',
	width: 'inherit',
	border: '1px solid black',
	borderRadius: DROPDOWN_BORDER_RADIUS,
	transition: '0s border'
};

export const dropdownOpenStyle = {
	boxSizing: 'border-box',
	cursor: 'pointer',
	maxHeight: '20rem',
	overflowY: 'scroll',
	width: 'inherit',
	borderRadius: `${DROPDOWN_BORDER_RADIUS} ${DROPDOWN_BORDER_RADIUS} 0 0`,
	transition: '0s borderTop',
	boxSizing: 'border-box',
	border: '1px solid black',
	borderBottom: '0'
};

export const dropdownBoxStyle = {
	boxSizing: 'border-box',
	height: `${DROPDOWN_HEIGHT_REMS}rem`,
	borderBottom: '1px solid black',
	backgroundColor: '#fff',
	zIndex: '0',
	textAlign: 'center',
	userSelect: 'none',
	width: 'inherit',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	borderLeft: 'none',
	borderRight: 'none',
	boxSizing: 'border-box'
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
	borderRadius: `0 0 ${DROPDOWN_BORDER_RADIUS} ${DROPDOWN_BORDER_RADIUS}`,
	boxSizing: 'border-box',
	border: '1px solid black'
};
