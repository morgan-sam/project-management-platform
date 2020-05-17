import React, { useState } from 'react';

const WizardButton = (props) => {
	const [ hover, setHover ] = useState(false);

	const wizardBtnStyle = {
		display: 'flex',
		width: '1.3rem',
		height: '1.3rem',
		border: '1px solid black',
		alignItems: 'center',
		justifyContent: 'center',
		userSelect: 'none',
		color: hover ? 'white' : 'black',
		backgroundColor: hover ? (props.color ? props.color : 'black') : 'white'
	};

	return (
		<div
			onClick={(val) => props.onClick(val)}
			onMouseOver={() => setHover(true)}
			onMouseLeave={() => setHover(false)}
			style={wizardBtnStyle}
		>
			⚡
		</div>
	);
};

export default WizardButton;
