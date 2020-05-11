import React from 'react';

const PopUp = (props) => {
	const popUpContainerStyle = {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		position: 'absolute',
		top: '50vh',
		left: '50vw',
		height: '10rem',
		width: '10rem',
		border: '1px solid black',
		transform: 'translate(-50%,-50%)',
		backgroundColor: 'white',
		zIndex: '10'
	};

	return (
		<div style={popUpContainerStyle}>
			<span>PopUp</span>{' '}
		</div>
	);
};

export default PopUp;
