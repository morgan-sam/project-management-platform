import React, { useContext, useState } from 'react';
import ThemeContext from 'context/ThemeContext';

const NavigationMenu = (props) => {
	const themeColor = useContext(ThemeContext);

	const menus = [
		{ name: 'File', sub: [ { name: 'Batch New Tasks' } ] },
		{ name: 'Edit', sub: [ { name: 'Select All' }, { name: 'Mark Complete' }, { name: 'Delete Selected' } ] },
		{ name: 'View', sub: [ { name: 'Filter' }, { name: 'New Task' } ] }
	];
	const convertMenusToOpenObj = () => {
		let obj = {};
		for (let i = 0; i < menus.length; i++) {
			obj[menus[i].name] = false;
		}
		return obj;
	};
	const [ menusOpen, setMenusOpen ] = useState(convertMenusToOpenObj());

	const parentContainer = {
		height: '2rem',
		margin: '2rem 0 1.75rem 0',
		display: 'flex',
		justifyContent: 'left',
		alignItems: 'top',
		overflow: 'visible'
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
		fontSize: '0.75rem',
		backgroundColor: 'white',
		zIndex: '10'
	};

	const mainMenuContainer = {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'left',
		alignItems: 'center'
	};

	const singleMenuBox = (box) => {
		return <div style={boxStyle}>{box}</div>;
	};

	const multipleBoxes = (boxes) => {
		return <div style={mainMenuContainer}>{boxes.map((el) => singleMenuBox(el.name))}</div>;
	};

	const menuDropdownContainer = (el) => {
		const { name, sub } = el;
		return (
			<div
				onMouseOver={() => {
					let newObj = Object.assign({}, menusOpen);
					newObj[name] = true;
					setMenusOpen(newObj);
				}}
				onMouseLeave={() => {
					let newObj = Object.assign({}, menusOpen);
					newObj[name] = false;
					setMenusOpen(newObj);
				}}
			>
				{menusOpen[name] ? multipleBoxes([ el, ...sub ]) : singleMenuBox(name)}
			</div>
		);
	};

	const mainRowOfBoxes = () => {
		return menus.map((el) => menuDropdownContainer(el));
	};

	return <div style={parentContainer}>{mainRowOfBoxes()}</div>;
};

export default NavigationMenu;
