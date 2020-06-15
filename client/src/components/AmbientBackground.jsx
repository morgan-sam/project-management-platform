import React, { useContext } from 'react';
import ThemeContext from 'context/ThemeContext';
import { shapeStyle, parentContainer } from 'styling/ambientBackground';
import { colorToWhiteArray } from 'processing/processColors';

const AmbientBackground = (props) => {
	const NUM_OF_SHAPES = 30;
	const themeColor = useContext(ThemeContext);
	const colors = colorToWhiteArray(themeColor, NUM_OF_SHAPES);

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
