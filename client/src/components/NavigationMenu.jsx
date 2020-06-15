import React, { useContext, useState, useEffect } from 'react';
import ThemeContext from 'context/ThemeContext';
import { getParentContainer, getBoxStyle } from 'styling/navigationMenu';
import { getBoxPosition, rightSideArrowStyle, checkboxStyle } from 'styling/navigationMenuBox';
import Checkbox from 'components/Checkbox';

const NavigationMenu = (props) => {
	const themeColor = useContext(ThemeContext);

	const [ menusOpen, setMenusOpen ] = useState([]);
	const [ hover, setHover ] = useState([]);

	const singleMenuBox = (el, menuPos) => {
		const { name, action, enabled, checkbox } = el;
		const hovered = menuPos.toString() === hover.toString();
		const buttonState = { hovered, enabled };
		return (
			<div
				key={menuPos.toString()}
				onMouseOver={() => setHover(menuPos)}
				onMouseLeave={() => setHover([])}
				onClick={() => {
					if (action && enabled !== false) action();
					if (menusOpen.length === 0) setMenusOpen(menuPos);
					else if (enabled !== false && checkbox === undefined) setMenusOpen([]);
				}}
				className="navMenu"
				style={{
					...getBoxStyle(buttonState, themeColor),
					...getBoxPosition(menuPos)
				}}
				id={menuPos.toString()}
			>
				{name}
				{menuPos.length > 1 && el.sub && <div style={rightSideArrowStyle}>▶</div>}
				{checkbox !== undefined && (
					<Checkbox className="navMenu" style={checkboxStyle} default={checkbox} onChange={() => action()} />
				)}
			</div>
		);
	};

	const multipleBoxes = (el, menuPos) =>
		el.sub ? el.sub.map((el, i) => menuDropdownContainer(el, [ ...menuPos, i ])) : null;

	useEffect(() => {
		if (menusOpen.length) document.addEventListener('mousedown', whileDropdownOpenClick);
		else document.removeEventListener('mousedown', whileDropdownOpenClick);
		return () => document.removeEventListener('mousedown', whileDropdownOpenClick);
	});

	const whileDropdownOpenClick = (e) => (e.target.className === 'navMenu' ? null : setMenusOpen([]));

	const menuDropdownContainer = (el, menuPos) => {
		const { sub, enabled } = el;
		if (sub)
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
		else return singleMenuBox(el, menuPos);
	};

	const mainRowOfBoxes = () => props.menus.map((el, i) => menuDropdownContainer(el, [ i ]));

	return <div style={{ ...getParentContainer(props.menus.length), ...props.style }}>{mainRowOfBoxes()}</div>;
};

export default NavigationMenu;
