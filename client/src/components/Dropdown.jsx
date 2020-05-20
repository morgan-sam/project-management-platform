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
	const [ endOfList, setEndOfList ] = useState(false);
	const [ optionDivs, setOptionDivs ] = useState(false);
	const getCurrentOptionStyle = (index, options) => {
		const max = options.length - 1;
		if (index === max) return { ...optionStyle, ...finalOptionStyle };
		else return optionStyle;
	};
	const themeColor = useContext(ThemeContext);

	useEffect(
		() => {
			setOptionDivs(
				props.options
					? props.options.map((value, i) => {
							return (
								<DropdownEntry
									className="dropdown"
									hoverEnabled={endOfList || !listOpening}
									listOpen={listOpen}
									onClick={props.onClick}
									style={getCurrentOptionStyle(i, props.options)}
									value={value}
									selected={props.default === value}
									setListOpen={setListOpen}
									key={i}
								/>
							);
						})
					: null
			);
		},
		[ listOpen, listOpening, endOfList, props.filterOptions ]
	);

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
					convertRemToPixels(DROPDOWN_HEIGHT_REMS) * (props.options.length - 1) +
					parseFloat(getComputedStyle(document.documentElement).fontSize) * 2;
				const dropdownMaxSize = convertRemToPixels(DROPDOWN_MAX_HEIGHT_REMS);
				dropdownSize = Math.max(0, dropdownSize - dropdownMaxSize);
				setEndOfList(dropdownSize === dropdownRef.current.scrollTop);
			};
		},
		[ optionDivs ]
	);

	useEffect(
		() => {
			if (props.onOpenChange) {
				if (!listOpen) props.onOpenChange(listOpen);
				else
					setTimeout(() => {
						props.onOpenChange(listOpen);
					}, 10);
			}
			if (listOpen) setListingOpening(true);
		},
		[ listOpen ]
	);

	useEffect(() => {
		const checkListFinishedOpening = (e) => {
			if (e.propertyName === 'max-height') {
				setListingOpening(false);
			}
		};
		dropdownRef.current.addEventListener('transitionend', (e) => checkListFinishedOpening(e), false);
		return dropdownRef.current.addEventListener('transitionend', (e) => checkListFinishedOpening(e), false);
	}, []);

	return (
		<div className={props.className} style={{ ...dropdownParentStyle, ...props.style }}>
			<div className="dropdownElement" style={dropdownElementStyle}>
				<div
					className="dropdownOptionContainer"
					style={listOpen ? dropdownOpenStyle(listOpen) : dropdownClosedStyle(listOpen)}
					ref={dropdownRef}
				>
					{listOpen ? (
						optionDivs
					) : (
						<DropdownHeader
							default={props.default}
							setListOpen={setListOpen}
							listOpen={listOpen}
							hoverEnabled={endOfList || !listOpening}
						/>
					)}
				</div>
				<div
					className="dropdown"
					style={{
						...dropdownBoxStyle(themeColor, { listOpen, hovered: false }),
						...dropdownEndNode,
						display: listOpen ? 'flex' : 'none'
					}}
				>
					{endOfList ? '✖' : '▼'}
				</div>
			</div>
		</div>
	);
};

export default Dropdown;
