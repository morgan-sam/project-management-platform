export const newTaskBarStyle = {
	position: 'relative',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	flexDirection: 'row',
	borderRadius: '5px',
	border: '1px solid black',
	boxSizing: 'content-box',
	height: 'auto',
	overflow: 'hidden',
	zIndex: '8'
};

const smallOpenTransition = 'max-height 1s cubic-bezier(.23,.52,.53,.74)';
const smallCloseTransition = 'max-height .8s cubic-bezier(.27,.97,.36,.96)';

const largeCloseTransition = 'max-height 1s cubic-bezier(.41,.49,.23,.93)';
const largeOpenTransition = 'max-height 0.7s cubic-bezier(.38,.03,.23,.93)';

export const getTaskBarHiddenStyle = (popUpOpen) => {
	return {
		opacity: '0',
		maxHeight: '0',
		zIndex: '-10',
		//executes on task bar close
		transition: `${popUpOpen
			? largeCloseTransition
			: smallCloseTransition}, opacity 1s cubic-bezier(0,1.06,.62,.99)`
	};
};

export const getTaskBarVisibleStyle = (popUpOpen) => {
	return {
		maxHeight: '11rem',
		opacity: '1',
		//executes on task bar open
		transition: `${popUpOpen ? largeOpenTransition : smallOpenTransition}, opacity 1s`
	};
};
