import React from 'react';
import ColorButton from 'components/ColorButton';

const PopUp = (props) => {
	const popUpContainerStyle = {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		position: 'absolute',
		top: '50vh',
		left: '50vw',
		height: '12rem',
		width: '23rem',
		border: '1px solid black',
		transform: 'translate(-50%,-50%)',
		backgroundColor: 'white',
		zIndex: '10'
	};

	const buttonContainerStyle = {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		margin: '1rem'
	};

	const buttonStyle = {
		width: '5rem',
		height: '2rem',
		lineHeight: '0'
	};

	const messageContainerStyle = {
		width: '75%',
		textAlign: 'center',
		lineHeight: '1.5rem',
		margin: '2rem 0 0 0'
	};

	return (
		<div style={popUpContainerStyle}>
			<div style={messageContainerStyle}>
				<h3>{props.message}</h3>
			</div>
			<div style={buttonContainerStyle}>
				<ColorButton
					color={'green'}
					style={buttonStyle}
					text={'Confirm'}
					onClick={() => console.log('Confirm')}
				/>
				<ColorButton
					color={'darkred'}
					style={buttonStyle}
					text={'Cancel'}
					onClick={() => console.log('Cancel')}
				/>
			</div>
		</div>
	);
};

export default PopUp;
