import React, { useState, useContext } from 'react';
import ThemeContext from 'context/ThemeContext';

const WizardButton = (props) => {
	const [ hover, setHover ] = useState(false);
	const themeColor = useContext(ThemeContext);

	const wizardBtnStyle = {
		display: 'flex',
		width: '1.3rem',
		height: '1.3rem',
		border: '1px solid black',
		alignItems: 'center',
		justifyContent: 'center',
		userSelect: 'none',
		color: hover ? 'white' : 'black',
		backgroundColor: hover ? themeColor : 'white'
	};

	return (
		<div
			onClick={(val) => props.onClick(val)}
			onMouseOver={() => setHover(true)}
			onMouseLeave={() => setHover(false)}
			style={wizardBtnStyle}
		>
			<span role="img" aria-label="lightning">
				⚡
			</span>
		</div>
	);
};

export default WizardButton;
