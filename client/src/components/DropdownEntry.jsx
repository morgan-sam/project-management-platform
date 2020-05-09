import React, { useState, useContext } from 'react';
import ThemeContext from 'context/ThemeContext';
import { capitalizeFirstLetter } from 'processing/utility';
import { dropdownBoxStyle } from '../styling/dropdown';

const DropdownEntry = (props) => {
	const [ hovered, setHovered ] = useState();
	const { listOpen, entryIndex, onClick, setListOpen, value } = props;
	const themeColor = useContext(ThemeContext);
	return (
		<div
			key={entryIndex}
			className="dropdownOption"
			style={{
				...dropdownBoxStyle(themeColor, { listOpen, hovered }),
				...props.style
			}}
			onMouseDown={() => {
				onClick(value);
				setListOpen(false);
			}}
			onMouseOver={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)}
		>
			{typeof value === 'string' ? capitalizeFirstLetter(value) : value}
		</div>
	);
};

export default DropdownEntry;
