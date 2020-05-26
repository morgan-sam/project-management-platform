export const screenStyle = {
	position: 'absolute',
	height: '100%',
	width: '100%',
	left: '0',
	top: '0',
	overflow: 'hidden'
};

export const getMainPageStyle = (scrollLocked = false) => {
	return {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		width: '75vw',
		margin: '0 auto',
		padding: '2.6rem',
		boxSizing: 'border-box',
		margin: '0 auto',
		overflow: scrollLocked ? 'hidden' : 'visible'
	};
};

export const tableStyle = {
	margin: '0 0 3rem 0'
};

export const overlayStyle = {
	height: '100vw',
	width: '100vw',
	background: 'white',
	opacity: '0.8',
	position: 'fixed',
	top: '0',
	left: '0',
	zIndex: '9',
	animation: 'overlay-fade-in linear 0.4s'
};
