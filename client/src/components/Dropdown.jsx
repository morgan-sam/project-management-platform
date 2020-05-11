import React, { useEffect, useState, useContext, useRef } from 'react';
import ThemeContext from 'context/ThemeContext';
import DropdownHeader from 'components/DropdownHeader';
import DropdownEntry from 'components/DropdownEntry';
import { convertRemToPixels } from 'processing/convertUnits';

import {
	dropdownParentStyle,
	dropdownElementStyle,
	dropdownBoxStyle,
	dropdownClosedStyle,
	dropdownOpenStyle,
	finalOptionStyle,
	optionStyle,
	dropdownEndNode,
	DROPDOWN_HEIGHT_REMS,
	DROPDOWN_MAX_HEIGHT_REMS
} from 'styling/dropdown';

const Dropdown = (props) => {
	const dropdownRef = useRef(null);
	const [ listOpen, setListOpen ] = useState(false);
	const [ listOpening, setListingOpening ] = useState(false);
	const [ hoveredItem, setHoveredItem ] = useState(false);
	const [ endOfList, setEndOfList ] = useState(false);
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

	useEffect(
		() => {
			dropdownRef.current.onscroll = () => {
				let dropdownSize =
					convertRemToPixels(DROPDOWN_HEIGHT_REMS) * props.options.length +
					parseFloat(getComputedStyle(document.documentElement).fontSize) * 2 +
					1;
				const dropdownMaxSize = convertRemToPixels(DROPDOWN_MAX_HEIGHT_REMS);
				dropdownSize = Math.max(0, dropdownSize - dropdownMaxSize);
				setEndOfList(dropdownSize == dropdownRef.current.scrollTop);
			};
		},
		[ optionDivs ]
	);

	useEffect(
		() => {
			if (listOpen) setListingOpening(true);
		},
		[ listOpen ]
	);
	useEffect(
		() => {
			if (listOpen) {
				const checkListFinishedOpening = (e) => {
					if (e.propertyName === 'max-height') {
						setListingOpening(false);
					}
				};
				dropdownRef.current.addEventListener('transitionend', (e) => checkListFinishedOpening(e), false);
				return dropdownRef.current.addEventListener('transitionend', (e) => checkListFinishedOpening(e), false);
			}
		},
		[ listOpen ]
	);

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
					{endOfList ? '✖' : '▼'}
				</div>
			</div>
		</div>
	);
};

export default Dropdown;
