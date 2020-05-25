export const BOX_WIDTH_REM = 4;
export const BOX_HEIGHT_REM = 2;

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
	borderTop: '1px solid black',
	borderLeft: '1px solid black',
	borderRight: '1px solid black',
	borderBottom: '1px solid black',
	height: `${BOX_HEIGHT_REM}rem`,
	width: `${BOX_WIDTH_REM}rem`,
	userSelect: 'none',
	cursor: 'pointer',
	fontSize: '0.75rem',
	backgroundColor: 'white',
	zIndex: '10',
	boxSizing: 'border-box'
};
