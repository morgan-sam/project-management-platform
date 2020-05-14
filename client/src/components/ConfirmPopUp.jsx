import React, { useEffect } from 'react';
import ColorButton from 'components/ColorButton';

const ConfirmPopUp = (props) => {
	const popUpCloseTimeMs = 400;
	const { message, confirm, setConfirmPopUp, pressedKeys } = props;

	const popUpContainerStyle = {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		position: 'fixed',
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

	const closePopUp = () => {
		setConfirmPopUp({ message: null, confirm: null, cancel: null });
	};

	useEffect(
		() => {
			if (pressedKeys.includes('Escape')) closePopUp();
			if (pressedKeys.includes('Enter')) {
				closePopUp();
				confirm();
			}
		},
		[ pressedKeys ]
	);

	return (
		<div className={'popUp'} style={popUpContainerStyle}>
			<div style={messageContainerStyle}>
				<h3>{message}</h3>
			</div>
			<div style={buttonContainerStyle}>
				<ColorButton
					color={'green'}
					style={buttonStyle}
					text={'Confirm'}
					onClick={async () => {
						setTimeout(() => {
							closePopUp();
							confirm();
						}, popUpCloseTimeMs);
					}}
				/>
				<ColorButton
					color={'darkred'}
					style={buttonStyle}
					text={'Cancel'}
					onClick={() => setTimeout(() => closePopUp(), popUpCloseTimeMs)}
				/>
			</div>
		</div>
	);
};

export default ConfirmPopUp;