import React from 'react';
export const loadingScreenStyle = {
	position: 'absolute',
	top: '0',
	left: '0',
	display: 'flex',
	height: '100vh',
	width: '100vw',
	alignItems: 'center',
	justifyContent: 'center'
};

export const spinnerStyle = {
	height: '3rem',
	width: '3rem',
	borderTop: '10px solid #4287f5',
	borderRight: '10px solid #eee',
	borderBottom: '10px solid #eee',
	borderLeft: '10px solid #eee',
	borderRadius: '100%',
	animation: 'spin 0.75s cubic-bezier(.17,.67,.83,.67) infinite'
};

const LoadingScreen = () => {
	return (
		<div style={loadingScreenStyle}>
			<div style={spinnerStyle} />
		</div>
	);
};
export default LoadingScreen;
