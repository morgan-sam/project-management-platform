import { flexCenter } from './generic';

export const dateOptionSlideStyling = {
	display: 'flex',
	justifyContent: 'left',
	alignItems: 'center',
	border: '1px solid black',
	transition: '1s',
	position: 'relative',
	borderRadius: '5px'
};

export const dateSelectConfirmContainerStyling = {
	transition: '1s'
};

export const dateDisplayBoxStyling = {
	height: 'auto',
	padding: '0 0.5rem',
	textAlign: 'center',
	userSelect: 'none',
	cursor: 'pointer',
	transition: '1s'
};

export const dateSlideStyling = {
	textAlign: 'center',
	display: 'grid',
	transition: '1s'
};

export const canConContainerStyle = {
	...flexCenter,
	paddingRight: '0.75rem',
	transition: '0.5s'
};

export const canConBtnStyle = {
	margin: '0.5rem',
	height: '2.2rem',
	width: '2.2rem',
	boxShadow: '1px 1px 1px 1px #ddd',
	color: '#eee',
	fontSize: '2rem',
	fontWeight: 'bold',
	WebkitTextStroke: '0.7px #222',
	display: 'flex',
	justifyContent: 'center',
	lineHeight: '1.72rem',
	outline: 'none'
};

export const confirmBtnStyle = {
	backgroundColor: '#b3ff99',
	userSelect: 'none',
	cursor: 'pointer',
	border: '3px solid #99ff99',
	borderRadius: '5px'
};

export const cancelBtnStyle = {
	backgroundColor: '#ff9999',
	userSelect: 'none',
	cursor: 'pointer',
	border: '3px solid #ff8080',
	borderRadius: '5px'
};
