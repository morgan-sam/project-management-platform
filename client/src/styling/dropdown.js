const DROPDOWN_HEIGHT_REMS = 2;
const DROPDOWN_BORDER_RADIUS = '5px';

export const dropdownParentStyle = {
	width: '100%',
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
	position: 'relative'
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
	cursor: 'pointer',
	maxHeight: `${DROPDOWN_HEIGHT_REMS}rem`,
	overflow: 'hidden',
	width: 'inherit'
};

export const dropdownOpenStyle = {
	cursor: 'pointer',
	maxHeight: '20rem',
	overflowY: 'scroll',
	width: 'inherit'
};

export const dropdownBoxStyle = {
	boxSizing: 'border-box',
	height: `${DROPDOWN_HEIGHT_REMS}rem`,
	border: '1px solid black',
	backgroundColor: '#ccc',
	zIndex: '0',
	textAlign: 'center',
	userSelect: 'none',
	width: 'inherit',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center'
};

export const optionStyle = {
	borderTop: 'none',
	width: 'inherit'
};

export const finalOptionStyle = {
	borderBottom: 'none',
	width: 'inherit'
};

export const dropdownEndNode = {
	borderRadius: `0 0 ${DROPDOWN_BORDER_RADIUS} ${DROPDOWN_BORDER_RADIUS}`
};
