import React, { useContext } from 'react';
import ThemeContext from 'context/ThemeContext';

const NavigationMenu = (props) => {
	const themeColor = useContext(ThemeContext);

	const parentContainer = {
		height: 'auto',
		margin: '2rem 0',
		display: 'flex',
		justifyContent: 'left',
		alignItems: 'center'
	};

	const singleMenuBox = (box) => {
		return (
			<div
				style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					border: '1px solid black',
					height: '2rem',
					width: '4rem',
					userSelect: 'none',
					cursor: 'pointer'
				}}
			>
				{box}
			</div>
		);
	};

	const boxes = [ 'File', 'Edit', 'View' ];

	const mainRowOfBoxes = () => {
		return boxes.map((el) => singleMenuBox(el));
	};

	return <div style={parentContainer}>{mainRowOfBoxes()}</div>;
};

export default NavigationMenu;
