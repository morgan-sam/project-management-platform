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
		const buttonState = { hovered, enabled };
		return (
			<div
				onMouseOver={() => setHover(menuPos)}
				onMouseLeave={() => setHover([])}
				onClick={() => {
					if (action && enabled !== false) action();
					if (menusOpen.length === 0) setMenusOpen(menuPos);
					else if (enabled !== false) setMenusOpen([]);
				}}
				className="navMenu"
				style={{
					...getBoxStyle(buttonState, themeColor),
					...getBoxPosition(menuPos)
				}}
				id={menuPos.toString()}
			>
				{name}
				{menuPos.length > 1 &&
				el.sub && (
					<div
						style={{
							position: 'absolute',
							top: '50%',
							transform: 'translateY(-56%)',
							right: '0.5rem'
						}}
					>
						▶
					</div>
				)}
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
		const { sub, enabled } = el;
		return (
			<div
				key={menuPos.toString()}
				onMouseOver={(e) => {
					if (e.target.id === menuPos.toString() && menusOpen.length > 0 && enabled !== false)
						setMenusOpen(menuPos);
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

	return <div style={{ ...parentContainer, ...props.style }}>{mainRowOfBoxes()}</div>;
};

export default NavigationMenu;
