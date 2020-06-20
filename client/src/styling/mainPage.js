export const getScreenStyle = (fixedStyle) => {
	return {
		position: 'absolute',
		height: '100%',
		width: '100%',
		left: '0',
		top: '0',
		overflowY: fixedStyle ? 'hidden' : 'scroll'
	};
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
	zIndex: '19',
	animation: 'overlay-fade-in linear 0.4s'
};

export const getTableContainerStyle = (fixedStyle, values) => {
	console.log('hi');
	if (fixedStyle) {
		const { barConHeight, displayedBars } = values;
		return {
			padding: '4rem',
			display: 'flex',
			justifyContent: 'center',
			width: '100%',
			height: `${600 - barConHeight}px`,
			overflowY: 'scroll',
			transition: `${Object.values(displayedBars).includes(true) ? '0.2s ease-in-out' : '0.5s ease-in-out'}`,
			WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, white 10%, white 90%, transparent 100%)',
			maskImage: 'linear-gradient(to bottom, transparent 0%, white 10%, white 90%, transparent 100%)',
			animation: 'table-fixed-view-toggle 2s ease-in-out'
		};
	} else
		return {
			display: 'flex',
			justifyContent: 'center',
			width: '100%',
			height: '100%'
		};
};

export const getTopBarsContainerStyle = (barsAtTop) => {
	const defaultStyle = { margin: '0rem 0 2rem 0' };
	if (barsAtTop)
		return {
			...defaultStyle,
			position: 'sticky',
			top: '4rem'
		};
	else
		return {
			...defaultStyle,
			position: 'relative',
			top: '0rem'
		};
};
