import React, { useContext } from 'react';
import ThemeContext from 'context/ThemeContext';

const MainTitle = (props) => {
	const themeColor = useContext(ThemeContext);

	const mainTitleContainer = {
		position: 'relative',
		display: 'flex',
		height: 'auto'
	};

	const mainTitleStyle = {
		position: 'relative',
		fontSize: '2.2rem',
		background: `#fff -webkit-gradient(linear, left top, right top, from(${themeColor}), to(${themeColor}), color-stop(0.5, #fff)) 0 0 no-repeat`,
		WebkitBackgroundSize: '250px',
		color: 'rgba(0, 0, 0, 0.3)',
		WebkitBackgroundClip: 'text',
		textShadow: '0 0px 0px rgba(255, 255, 255, 0.2)',
		animation: 'title-fade-in 1s ease-in-out 0s 1 forwards, title-shine 1s ease-in-out 1s 1 forwards',
		backgroundPosition: '-300%'
	};

	return (
		<div style={{ ...props.style, ...mainTitleContainer }}>
			<h1 style={{ ...mainTitleStyle }}>PROJECT MANAGEMENT PLATFORM</h1>
		</div>
	);
};

export default MainTitle;
