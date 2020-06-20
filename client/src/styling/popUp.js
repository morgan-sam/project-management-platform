import { flexCenter, flexCenterColumn } from 'styling/generic';

export const titleStyle = {
	padding: '3rem',
	fontSize: '1.6rem'
};

export const popUpPositionStyle = {
	position: 'fixed',
	top: '0',
	left: '0',
	zIndex: '20'
};

export const topContainerStyle = {
	...flexCenter,
	height: '100vh',
	width: '100vw',
	zIndex: '20'
};

export const popUpWindowStyle = {
	...flexCenterColumn,
	position: 'fixed',
	border: '1px solid black',
	backgroundColor: 'white',
	padding: '2rem',
	height: 'auto',
	width: 'auto',
	opacity: '0',
	zIndex: '20',
	animation: 'batch-popup-fade-in 1s cubic-bezier(.57,.82,.01,.82) 0.1s 1 forwards'
};

export const subContainerStyle = {
	...flexCenterColumn,
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
	fontSize: '2rem',
	outline: 'none'
};

export const errorMatchTextStyle = {
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
	padding: '2.5rem',
	...flexCenter
};

export const dateGridStyle = {
	display: 'grid',
	gridTemplateColumns: 'repeat(2, 1fr)',
	gridTemplateRows: 'repeat(2, 1fr)',
	justifyContent: 'center',
	alignItems: 'center',
	marginTop: '2rem',
	zIndex: '22'
};

export const dateTopContainer = {
	display: 'flex',
	flexDirection: 'column',
	padding: '2rem',
	alignItems: 'center'
};

export const dateRangeContainer = {
	display: 'flex',
	flexDirection: 'row',
	zIndex: '21'
};

export const dateContainer = {
	margin: '1rem',
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	zIndex: '20'
};

export const dateLabel = {
	marginBottom: '1rem'
};

export const autoContainerStyle = {
	...flexCenterColumn,
	margin: '1rem'
};
