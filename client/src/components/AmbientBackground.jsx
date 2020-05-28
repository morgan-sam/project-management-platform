import React, { useContext } from 'react';
import ThemeContext from 'context/ThemeContext';
import { colorToWhiteArray } from 'processing/processColors';

const AmbientBackground = (props) => {
	const NUM_OF_SHAPES = 30;
	const themeColor = useContext(ThemeContext);
	const colors = colorToWhiteArray(themeColor, NUM_OF_SHAPES);

	const shapeStyle = {
		position: 'absolute',
		display: 'block',
		height: '100rem',
		width: '40rem',
		borderRadius: '100%',
		animation: 'spiral 30s ease-in-out infinite alternate',
		opacity: '0'
	};

	const parentContainer = {
		position: 'fixed',
		top: '0',
		left: '0',
		height: '100vh',
		width: '100vw',
		zIndex: '-1',
		overflow: 'hidden'
	};

	const getBackgroundShapes = () => {
		return [ ...Array(NUM_OF_SHAPES).keys() ].map((i) => (
			<div
				key={i}
				style={{
					...shapeStyle,
					right: `${i}rem`,
					top: `${i}rem`,
					animationDelay: `${i / 10}s`,
					backgroundColor: colors[i]
				}}
			/>
		));
	};

	return <div style={parentContainer}>{getBackgroundShapes()}</div>;
};

export default AmbientBackground;
