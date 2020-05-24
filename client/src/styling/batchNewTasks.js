export const titleStyle = {
	padding: '3rem',
	fontSize: '1.6rem'
};

export const topContainerStyle = {
	height: '100vh',
	width: '100vw',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center'
};

export const popUpWindowStyle = {
	position: 'fixed',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	flexDirection: 'column',
	border: '1px solid black',
	backgroundColor: 'white',
	padding: '2rem',
	height: 'auto',
	width: 'auto',
	opacity: '0',
	zIndex: '10',
	animation: 'batch-popup-fade-in 1s cubic-bezier(.57,.82,.01,.82) 0.1s 1 forwards'
};

export const subContainerStyle = {
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'center',
	height: '4rem'
};

export const cancelButtonStyle = {
	position: 'absolute',
	display: 'flex',
	justifyContent: 'center',
	lineHeight: '0',
	height: '2rem',
	width: '2rem',
	top: '1rem',
	right: '1rem',
	backgroundColor: 'salmon',
	color: 'white',
	fontSize: '2rem'
};

export const errorTextStyle = {
	position: 'relative',
	top: '1rem',
	lineHeight: '0',
	color: '#c12d29'
};

export const topRowStyle = {
	display: 'flex',
	flexDirection: 'row'
};

export const finalContainerStyle = {
	padding: '2.5rem'
};
