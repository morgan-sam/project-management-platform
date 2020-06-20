import React, { useEffect } from 'react';
import ColorButton from 'components/ColorButton';

import {
	titleStyle,
	popUpPositionStyle,
	topContainerStyle,
	popUpWindowStyle,
	subContainerStyle,
	cancelButtonStyle,
	finalContainerStyle
} from 'styling/popUp';

const ConfirmPopUp = (props) => {
	const popUpCloseTimeMs = 400;
	const { message, setPopUp, pressedKeys } = props;
	const closePopUp = () => setPopUp(null);

	useEffect(
		() => {
			if (pressedKeys.includes('Escape')) closePopUp();
		},
		[ pressedKeys ]
	);

	const paragraphStyle = {
		margin: '0.3rem'
	};

	const convertMessageArrayToElements = () => {
		if (Array.isArray(message))
			return message.map((content, i) => (
				<p key={i} style={paragraphStyle}>
					{content}
				</p>
			));
		else return <p style={paragraphStyle}>{message}</p>;
	};

	return (
		<div className={'popUp'} style={popUpPositionStyle}>
			<div className={'popUp'} style={topContainerStyle}>
				<div className={'popUp'} style={popUpWindowStyle}>
					<h2 style={titleStyle}>About</h2>
					<div style={subContainerStyle}>{convertMessageArrayToElements()}</div>
					<div style={finalContainerStyle}>
						<ColorButton
							text={'Close'}
							onClick={async () => {
								setTimeout(() => {
									closePopUp();
								}, popUpCloseTimeMs);
							}}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ConfirmPopUp;
