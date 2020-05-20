import React, { useEffect } from 'react';
import ColorButton from 'components/ColorButton';
import { popUpContainerStyle, buttonContainerStyle, buttonStyle, messageContainerStyle } from 'styling/confirmPopUp';

const ConfirmPopUp = (props) => {
	const popUpCloseTimeMs = 400;
	const { message, confirm, setPopUp, pressedKeys } = props;
	const closePopUp = () => setPopUp(null);

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
