export const BOX_WIDTH_REM = 4;

export const parentContainer = {
	position: 'relative',
	height: '2rem',
	margin: '2rem 0 1.75rem 0',
	display: 'block',
	overflow: 'visible',
	zIndex: '10'
};

export const boxStyle = {
	textAlign: 'center',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	border: '1px solid black',
	height: '2rem',
	width: `${BOX_WIDTH_REM}rem`,
	userSelect: 'none',
	cursor: 'pointer',
	fontSize: '0.75rem',
	backgroundColor: 'white',
	zIndex: '10',
	boxSizing: 'border-box'
};

export const flexColumn = {
	display: 'inline-flex',
	flexDirection: 'column'
};

export const flexRow = {
	display: 'inline-flex',
	flexDirection: 'row'
};

export const getTopMenuStyle = (menuPos) => {
	return {
		...flexColumn,
		position: 'absolute',
		left: `${menuPos[menuPos.length - 1] * BOX_WIDTH_REM}rem`
	};
};

export const subMenuStyle = {
	...flexRow,
	position: 'relative'
};
