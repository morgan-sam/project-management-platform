import React, { useContext, useState } from 'react';
import ThemeContext from 'context/ThemeContext';

const NavigationMenu = (props) => {
	const themeColor = useContext(ThemeContext);

	const BOX_WIDTH_REM = 4;

	const bntSub = [
		{ name: 'hello!', sub: [ { name: '53' } ] },
		{ name: 'what!', sub: [ { name: '53' } ] },
		{
			name: 'yellow!',
			sub: [
				{ name: '53' },
				{ name: '53' },
				{ name: '53' },
				{ name: '53' },
				{ name: '53' },
				{ name: '53' },
				{ name: '53' },
				{ name: '53' }
			]
		}
	];
	const menus = [
		{ name: 'File', sub: [ { name: 'Batch New Tasks', sub: bntSub } ] },
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
		position: 'relative',
		height: '2rem',
		margin: '2rem 0 1.75rem 0',
		display: 'block',
		overflow: 'visible',
		zIndex: '10'
	};

	const boxStyle = {
		textAlign: 'center',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		border: '1px solid black',
		height: '2rem',
		width: `${BOX_WIDTH_REM}rem`,
		userSelect: 'none',
		cursor: 'pointer',
		fontSize: '0.75rem',
		backgroundColor: 'white',
		zIndex: '10',
		boxSizing: 'border-box'
	};

	const flexColumn = {
		display: 'inline-flex',
		flexDirection: 'column'
	};
	const flexRow = {
		display: 'inline-flex',
		flexDirection: 'row'
	};

	const singleMenuBox = (text) => {
		return <div style={boxStyle}>{text}</div>;
	};

	const multipleBoxes = (el, recur) => {
		return el.sub ? el.sub.map((el, i) => menuDropdownContainer(el, ++recur, i)) : null;
	};

	const menuDropdownContainer = (el, recur, menuPos = 0) => {
		const { name, sub } = el;
		console.log(menuPos);
		return (
			<div
				style={{
					...(recur === 0 ? flexColumn : flexRow),
					position: recur === 0 ? 'absolute' : 'relative',
					left: recur === 0 ? `${menuPos * BOX_WIDTH_REM}rem` : null
				}}
				onMouseOver={() => {
					if (!menusOpen[name]) {
						let newObj = Object.assign({}, menusOpen);
						newObj[name] = true;
						setMenusOpen(newObj);
					}
				}}
				onMouseLeave={() => {
					if (menusOpen[name]) {
						let newObj = Object.assign({}, menusOpen);
						newObj[name] = false;
						setMenusOpen(newObj);
					}
				}}
			>
				{singleMenuBox(name)}
				<div style={flexColumn}>{menusOpen[name] && sub ? multipleBoxes(el, recur) : null}</div>
			</div>
		);
	};

	const mainRowOfBoxes = () => {
		return menus.map((el, i) => menuDropdownContainer(el, 0, i));
	};

	return <div style={parentContainer}>{mainRowOfBoxes()}</div>;
};

export default NavigationMenu;
