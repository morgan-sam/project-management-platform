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

	const [ menusOpen, setMenusOpen ] = useState([]);

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

	const singleMenuBox = (text, menuPos) => {
		let individualStyle;
		if (menuPos[0] !== 0 && menuPos.length === 1) individualStyle = { borderLeft: 'none' };
		else individualStyle = { borderLeft: '1px solid black' };
		return (
			<div style={{ ...boxStyle, ...individualStyle }} id={menuPos.toString()}>
				{text}
			</div>
		);
	};

	const multipleBoxes = (el, menuPos) => {
		return el.sub ? el.sub.map((el, i) => menuDropdownContainer(el, [ ...menuPos, i ])) : null;
	};

	const getTopMenuStyle = (menuPos) => {
		return {
			...flexColumn,
			position: 'absolute',
			left: `${menuPos[menuPos.length - 1] * BOX_WIDTH_REM}rem`
		};
	};

	const subMenuStyle = {
		...flexRow,
		position: 'relative'
	};

	const menuDropdownContainer = (el, menuPos) => {
		const { name, sub } = el;
		return (
			<div
				onClick={() => {
					if (menusOpen.length === 0) setMenusOpen(menuPos);
					else setMenusOpen([]);
				}}
				style={menuPos.length === 1 ? getTopMenuStyle(menuPos) : subMenuStyle}
				onMouseOver={(e) => {
					if (e.target.id === menuPos.toString() && menusOpen.length > 0) setMenusOpen(menuPos);
				}}
			>
				{singleMenuBox(name, menuPos)}
				<div style={flexColumn}>
					{menusOpen[menuPos.length - 1] === menuPos[menuPos.length - 1] && sub ? (
						multipleBoxes(el, menuPos)
					) : null}
				</div>
			</div>
		);
	};

	const mainRowOfBoxes = () => {
		return menus.map((el, i) => menuDropdownContainer(el, [ i ]));
	};

	return <div style={parentContainer}>{mainRowOfBoxes()}</div>;
};

export default NavigationMenu;
