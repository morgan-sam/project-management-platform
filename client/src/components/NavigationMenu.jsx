import React, { useContext, useState, useEffect } from 'react';
import ThemeContext from 'context/ThemeContext';
import { parentContainer, boxStyle } from 'styling/navigationMenu';
import { getBoxPosition } from 'styling/navigationMenuBox';

const NavigationMenu = (props) => {
	const themeColor = useContext(ThemeContext);

	const bntSub = [
		{ name: 'hello!', sub: [ { name: '53' } ] },
		{ name: 'what!', sub: [ { name: '53' } ] },
		{
			name: 'yellow!',
			sub: [
				{
					name: '53',
					sub: [ { name: '53' }, { name: '53', sub: [ { name: '53' } ] } ]
				},
				{
					name: '53',
					sub: [
						{
							name: '53',
							sub: [
								{
									name: '53',
									sub: [
										{
											name: '53',
											sub: [ { name: '53' }, { name: '53' } ]
										},
										{
											name: '53',
											sub: [
												{ name: '53' },
												{ name: '53' },
												{ name: '53' },
												{ name: '53' },
												{ name: '53' },
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
									]
								}
							]
						},
						{ name: '53' }
					]
				}
			]
		}
	];
	const menus = [
		{ name: 'File', sub: [ { name: 'Batch New Tasks', sub: bntSub } ] },
		{
			name: 'Edit',
			sub: [ { name: 'Select All' }, { name: 'Mark Complete', sub: bntSub }, { name: 'Delete Selected' } ]
		},
		{ name: 'View', sub: [ { name: 'Filter', sub: bntSub }, { name: 'New Task' } ] },
		{ name: 'View', sub: [ { name: 'Filter' }, { name: 'New Task' } ] },
		{ name: 'View', sub: [ { name: 'Filter' }, { name: 'New Task' } ] },
		{ name: 'View', sub: [ { name: 'Filter' }, { name: 'New Task' } ] }
	];

	const [ menusOpen, setMenusOpen ] = useState([]);

	const singleMenuBox = (text, menuPos) => {
		return (
			<div className="navMenu" style={{ ...boxStyle, ...getBoxPosition(menuPos) }} id={menuPos.toString()}>
				{`${menuPos.toString()}`}
			</div>
		);
	};

	const multipleBoxes = (el, menuPos) => {
		return el.sub ? el.sub.map((el, i) => menuDropdownContainer(el, [ ...menuPos, i ])) : null;
	};

	useEffect(() => {
		if (menusOpen.length) document.addEventListener('mousedown', whileDropdownOpenClick);
		else document.removeEventListener('mousedown', whileDropdownOpenClick);
		return () => document.removeEventListener('mousedown', whileDropdownOpenClick);
	});

	const whileDropdownOpenClick = (e) => {
		if (e.target.className === 'navMenu') return;
		setMenusOpen([]);
	};

	const menuDropdownContainer = (el, menuPos) => {
		const { name, sub } = el;
		return (
			<div
				key={menuPos.toString()}
				onClick={() => {
					if (menusOpen.length === 0) setMenusOpen(menuPos);
					else setMenusOpen([]);
				}}
				onMouseOver={(e) => {
					if (e.target.id === menuPos.toString() && menusOpen.length > 0) setMenusOpen(menuPos);
				}}
			>
				{singleMenuBox(name, menuPos)}
				<div>
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
