import { titleStyle } from 'styling/batchNewTasks';

const categoryStyle = {
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'center',
	padding: '1rem',
	textAlign: 'center',
	margin: '1.5rem 0rem'
};

export const mainGridContainer = {
	display: 'grid',
	gridTemplateColumns: 'repeat(2, 1fr)',
	gridTemplateRows: 'repeat(2, 1fr)'
};

export const getSectionOpacityStyle = (disabled) => {
	return {
		opacity: disabled ? '0.3' : '1',
		pointerEvents: disabled ? 'none' : 'auto'
	};
};

export const topContainer = {
	...titleStyle,
	...categoryStyle
};

export const topLeftContainer = {
	...categoryStyle,
	gridArea: '1 / 1 / 2 / 2'
};

export const bottomLeftContainer = {
	...categoryStyle,
	gridArea: '2 / 1 / 3 / 2'
};

export const topRightContainer = {
	...categoryStyle,
	gridArea: '1 / 2 / 2 / 3'
};

export const bottomRightContainer = {
	...categoryStyle,
	gridArea: '2 / 2 / 3 / 3'
};

export const bottomContainer = {
	padding: '2rem',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center'
};

export const containerItemStyle = {
	padding: '1rem'
};
