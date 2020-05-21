export const getMainPageStyle = (scrollLocked = false) => {
	return {
		height: '100vh',
		width: 'fit-content',
		position: 'absolute',
		padding: '2.6rem',
		boxSizing: 'border-box',
		left: '0',
		top: '0',
		overflow: scrollLocked ? 'hidden' : 'visible'
	};
};

export const taskManagerStyle = {
	margin: '1rem 0'
};

export const tableStyle = {
	margin: '0 0 3rem 0'
};

export const overlayStyle = {
	height: '100vh',
	width: '100vw',
	background: 'white',
	opacity: '0.8',
	position: 'absolute',
	top: '0',
	left: '0',
	zIndex: '9',
	animation: 'overlay-fade-in 0.8s'
};
