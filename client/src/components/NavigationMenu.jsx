import React, { useContext, useState } from 'react';
import ThemeContext from 'context/ThemeContext';

const NavigationMenu = (props) => {
	const themeColor = useContext(ThemeContext);

	const menus = [
		{ name: 'File', sub: [ 'Batch New Tasks' ] },
		{ name: 'Edit', sub: [ 'Select All', 'Mark Complete', 'Delete Selected' ] },
		{ name: 'View', sub: [ 'Filter', 'New Task' ] }
	];
	const convertMenusToOpenObj = () => {
		let obj = {};
		for (let i = 0; i < menus.length; i++) {
			obj[menus[i].name] = true;
		}
		return obj;
	};
	const [ menusOpen, setMenusOpen ] = useState(convertMenusToOpenObj());

	const parentContainer = {
		height: 'auto',
		margin: '2rem 0',
		display: 'flex',
		justifyContent: 'left',
		alignItems: 'top'
	};

	const boxStyle = {
		textAlign: 'center',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		border: '1px solid black',
		height: '2rem',
		width: '4rem',
		userSelect: 'none',
		cursor: 'pointer',
		fontSize: '0.75rem'
	};

	const mainMenuContainer = {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'left',
		alignItems: 'center'
	};

	const singleMenuBox = (box) => {
		return (
			<div
				style={boxStyle}
				onClick={() => {
					//
				}}
			>
				{box}
			</div>
		);
	};

	const multipleBoxes = (boxes) => {
		return <div style={mainMenuContainer}>{boxes.map((el) => singleMenuBox(el))}</div>;
	};

	const mainRowOfBoxes = () => {
		return menus.map((el) => {
			const { name, sub } = el;
			console.log(name);
			console.log(menusOpen);
			console.log(menusOpen[name]);
			if (menusOpen[name]) return multipleBoxes([ name, ...sub ]);
			else return singleMenuBox(name);
		});
	};

	return <div style={parentContainer}>{mainRowOfBoxes()}</div>;
};

export default NavigationMenu;
