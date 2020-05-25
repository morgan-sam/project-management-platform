export const BOX_WIDTH_REM = 8;
export const BOX_HEIGHT_REM = 2;
export const BOX_BORDER_WIDTH_PX = 1;

export const parentContainer = {
	position: 'relative',
	height: '2rem',
	margin: '2rem 0 1.75rem 0',
	display: 'block',
	overflow: 'visible',
	zIndex: '10'
};

export const boxStyle = {
	position: 'absolute',
	textAlign: 'center',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	borderTop: `${BOX_BORDER_WIDTH_PX}px solid black`,
	borderLeft: `${BOX_BORDER_WIDTH_PX}px solid black`,
	borderRight: `${BOX_BORDER_WIDTH_PX}px solid black`,
	borderBottom: `${BOX_BORDER_WIDTH_PX}px solid black`,
	height: `${BOX_HEIGHT_REM}rem`,
	width: `${BOX_WIDTH_REM}rem`,
	userSelect: 'none',
	cursor: 'pointer',
	fontSize: '0.75rem',
	backgroundColor: 'white',
	zIndex: '10',
	boxSizing: 'border-box'
};
