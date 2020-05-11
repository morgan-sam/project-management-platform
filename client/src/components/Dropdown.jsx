import React, { useEffect, useState, useContext, useRef } from 'react';
import ThemeContext from 'context/ThemeContext';
import DropdownHeader from 'components/DropdownHeader';
import DropdownEntry from 'components/DropdownEntry';

import {
	dropdownParentStyle,
	dropdownElementStyle,
	dropdownBoxStyle,
	dropdownClosedStyle,
	dropdownOpenStyle,
	finalOptionStyle,
	optionStyle,
	dropdownEndNode,
	DROPDOWN_HEIGHT_REMS
} from 'styling/dropdown';

const Dropdown = (props) => {
	const dropdownRef = useRef(null);
	const [ listOpen, setListOpen ] = useState(false);
	const [ hoveredItem, setHoveredItem ] = useState();
	const getCurrentOptionStyle = (index, options) => {
		const max = options.length - 1;
		if (index === max) return { ...optionStyle, ...finalOptionStyle };
		else return optionStyle;
	};
	const themeColor = useContext(ThemeContext);

	const optionDivs = props.options
		? props.options.map((value, i) => {
				return (
					<DropdownEntry
						hoveredItem={hoveredItem}
						setHoveredItem={setHoveredItem}
						listOpen={listOpen}
						onClick={props.onClick}
						style={getCurrentOptionStyle(i, props.options)}
						value={value}
						setListOpen={setListOpen}
						key={i}
					/>
				);
			})
		: null;

	useEffect(() => {
		checkIfOptionOOB();
		if (listOpen) document.addEventListener('mousedown', whileDropdownOpenClick);
		else document.removeEventListener('mousedown', whileDropdownOpenClick);
		return () => document.removeEventListener('mousedown', whileDropdownOpenClick);
	});

	const whileDropdownOpenClick = (e) => {
		if (e.target.className === 'dropdown') return;
		setListOpen(false);
	};

	useEffect(
		() => {
			if (props.onOpenChange) props.onOpenChange(listOpen);
		},
		[ listOpen ]
	);

	const checkIfOptionOOB = () => {
		if (props.options.indexOf(props.default) === -1) {
			const lastValue = props.options[props.options.length - 1];
			props.onClick(lastValue);
		}
	};

	const setDropdownStartPosition = () => {
		const currentIndex = props.options.indexOf(props.default);
		dropdownRef.current.scrollTop =
			DROPDOWN_HEIGHT_REMS * (currentIndex + 1) * parseFloat(getComputedStyle(dropdownRef.current).fontSize);
	};

	useEffect(() => setDropdownStartPosition(), [ listOpen ]);

	return (
		<div className={props.className} style={{ ...dropdownParentStyle, ...props.style }}>
			<div className="dropdownElement" style={dropdownElementStyle}>
				<div
					className="dropdownOptionContainer"
					style={listOpen ? dropdownOpenStyle(listOpen) : dropdownClosedStyle(listOpen)}
					ref={dropdownRef}
				>
					<DropdownHeader default={props.default} setListOpen={setListOpen} listOpen={listOpen} />
					{listOpen ? optionDivs : null}
				</div>
				<div
					style={{
						...dropdownBoxStyle(themeColor, { listOpen, hovered: false }),
						...dropdownEndNode,
						display: listOpen ? 'block' : 'none'
					}}
				>
					{'▼'}
				</div>
			</div>
		</div>
	);
};

export default Dropdown;
