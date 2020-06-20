const smallOpenTransition = 'max-height 1s cubic-bezier(.23,.52,.53,.74)';
const smallCloseTransition = 'max-height .8s cubic-bezier(.27,.97,.36,.96)';

const largeCloseTransition = 'max-height 1s cubic-bezier(.41,.49,.23,.93)';
const largeOpenTransition = 'max-height 0.7s cubic-bezier(.38,.03,.23,.93)';

const defaultBarStyle = {
	position: 'relative',
	height: 'auto',
	width: 'auto',
	border: '1px solid black',
	borderRadius: '5px',
	flexDirection: 'row',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-around',
	backgroundColor: 'white'
};

export const getTaskBarHiddenStyle = (popUpOpen) => {
	return {
		opacity: '0',
		maxHeight: '0',
		zIndex: '-10',
		margin: '0',
		padding: '0',
		border: '0px solid black',
		//executes on task bar close
		transition: `${popUpOpen
			? largeCloseTransition
			: smallCloseTransition}, opacity 1s cubic-bezier(0,1.06,.62,.99), border 0s linear 0.5s, margin 1s, padding 1s`
	};
};

export const getTaskBarVisibleStyle = (popUpOpen) => {
	return {
		opacity: '1',
		maxHeight: '11rem',
		padding: '0.5rem',
		margin: '0 0 1rem 0',
		//executes on task bar open
		transition: `${popUpOpen ? largeOpenTransition : smallOpenTransition}, opacity 1s`
	};
};

export const dataInfoBarStyle = {
	...defaultBarStyle,
	zIndex: '7'
};

export const dataInfoItemStyle = {
	padding: '1rem',
	margin: '1rem',
	border: '1px solid black'
};

export const newTaskBarStyle = {
	...defaultBarStyle,
	zIndex: '8'
};

export const filterBarStyle = {
	...defaultBarStyle,
	zIndex: '9'
};

export const filterBarItemStyle = {
	margin: '0 0.5rem',
	display: 'flex',
	alignItems: 'center'
};
