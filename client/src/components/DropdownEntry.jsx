import React, { useState, useContext } from 'react';
import ThemeContext from 'context/ThemeContext';
import { capitalizeFirstLetter } from 'processing/utility';
import { dropdownBoxStyle, getHoveredStyle, getDropdownTextStyle } from 'styling/dropdown';

const DropdownEntry = (props) => {
	const [ hovered, setHovered ] = useState();
	const { listOpen, onClick, setListOpen, value } = props;
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
			onMouseOver={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)}
		>
			<span style={getDropdownTextStyle(themeColor, hovered)}>
				{typeof value === 'string' ? capitalizeFirstLetter(value) : value}
			</span>
			<div style={{ ...getHoveredStyle(themeColor), opacity: hovered ? '1' : '0' }} />
		</div>
	);
};

export default DropdownEntry;
