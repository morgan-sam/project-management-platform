import React, { useEffect, useState, useContext, useRef } from 'react';
import ThemeContext from 'context/ThemeContext';
import { capitalizeFirstLetter } from 'processing/utility';
import { dropdownBoxStyle, getHoveredStyle, getDropdownTextStyle } from 'styling/dropdown';

const DropdownEntry = (props) => {
	const entryRef = useRef(null);
	const [ hovered, setHovered ] = useState();
	const { listOpen, onClick, setListOpen, value, hoverEnabled } = props;
	const themeColor = useContext(ThemeContext);

	useEffect(
		() => {
			//check if mouseover with no movement once hover enabled
			if (entryRef && entryRef.current && entryRef.current.querySelector(':hover')) {
				setHovered(true);
			}
		},
		[ hoverEnabled ]
	);

	return (
		<div
			ref={entryRef}
			className="dropdownOption"
			style={{
				...dropdownBoxStyle(listOpen),
				...props.style
			}}
			onMouseDown={() => {
				onClick(value);
				setListOpen(false);
			}}
			onMouseOver={() => {
				if (hoverEnabled) setHovered(true);
			}}
			onMouseLeave={() => setHovered(false)}
		>
			<span style={getDropdownTextStyle(themeColor, hoverEnabled && hovered)}>
				{typeof value === 'string' ? capitalizeFirstLetter(value) : value}
			</span>
			<div style={{ ...getHoveredStyle(themeColor), opacity: hoverEnabled && hovered ? '1' : '0' }} />
		</div>
	);
};

export default DropdownEntry;
