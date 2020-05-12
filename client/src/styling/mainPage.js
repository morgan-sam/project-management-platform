export const getMainPageStyle = (scrollLocked = false) => {
	return {
		height: '100vh',
		width: 'fit-content',
		position: 'absolute',
		padding: '2.6rem',
		boxSizing: 'border-box',
		left: '0',
		top: '0',
		overflow: scrollLocked ? 'hidden' : 'none'
	};
};

export const mainPageItemStyle = {
	margin: '1rem 0'
};
