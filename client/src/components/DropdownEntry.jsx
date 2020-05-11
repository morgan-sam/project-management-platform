import React, { useState, useContext } from 'react';
import ThemeContext from 'context/ThemeContext';
import { capitalizeFirstLetter } from 'processing/utility';
import { dropdownBoxStyle, getHoveredStyle, getDropdownTextStyle } from 'styling/dropdown';

const DropdownEntry = (props) => {
	const [ hovered, setHovered ] = useState();
	const { listOpen, onClick, setListOpen, value, hoverEnabled } = props;
	const themeColor = useContext(ThemeContext);
	return (
		<div
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
			onMouseLeave={() => {
				setHovered(false);
			}}
		>
			<span style={getDropdownTextStyle(themeColor, hoverEnabled && hovered)}>
				{typeof value === 'string' ? capitalizeFirstLetter(value) : value}
			</span>
			<div style={{ ...getHoveredStyle(themeColor), opacity: hoverEnabled && hovered ? '1' : '0' }} />
		</div>
	);
};

export default DropdownEntry;
