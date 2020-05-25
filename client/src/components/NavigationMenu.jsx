import React, { useContext, useState, useEffect } from 'react';
import ThemeContext from 'context/ThemeContext';
import { parentContainer, getBoxStyle } from 'styling/navigationMenu';
import { getBoxPosition } from 'styling/navigationMenuBox';

const NavigationMenu = (props) => {
	const themeColor = useContext(ThemeContext);

	const [ menusOpen, setMenusOpen ] = useState([]);
	const [ hover, setHover ] = useState([]);

	const singleMenuBox = (el, menuPos) => {
		const { name, action, enabled } = el;
		const hovered = menuPos.toString() === hover.toString();
		return (
			<div
				onMouseOver={() => setHover(menuPos)}
				onMouseLeave={() => setHover([])}
				onClick={() => (action && enabled !== false ? action() : null)}
				className="navMenu"
				style={{
					...getBoxStyle(hovered, themeColor),
					...getBoxPosition(menuPos)
				}}
				id={menuPos.toString()}
			>
				{name}
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
		const { sub } = el;
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
				{singleMenuBox(el, menuPos)}
				<div>
					{menusOpen[menuPos.length - 1] === menuPos[menuPos.length - 1] && sub ? (
						multipleBoxes(el, menuPos)
					) : null}
				</div>
			</div>
		);
	};

	const mainRowOfBoxes = () => {
		return props.menus.map((el, i) => menuDropdownContainer(el, [ i ]));
	};

	return <div style={parentContainer}>{mainRowOfBoxes()}</div>;
};

export default NavigationMenu;
