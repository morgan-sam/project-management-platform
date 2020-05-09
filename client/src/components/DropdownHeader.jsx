import React, { useState, useContext } from 'react';
import ThemeContext from 'context/ThemeContext';
import { capitalizeFirstLetter } from 'processing/utility';
import { dropdownBoxStyle, dropdownHeaderStyle } from 'styling/dropdown';

const DropdownHeader = (props) => {
	const [ hovered, setHovered ] = useState();
	const { listOpen, setListOpen } = props;
	const themeColor = useContext(ThemeContext);
	return (
		<div
			className="dropdownHeader"
			style={{
				...dropdownBoxStyle(themeColor, { listOpen, hovered }),
				...dropdownHeaderStyle(listOpen)
			}}
			onMouseDown={(e) => {
				if (e.buttons === 1) setListOpen(!listOpen);
			}}
			onContextMenu={(e) => e.preventDefault()}
			onMouseOver={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)}
		>
			{capitalizeFirstLetter(props.default)}
		</div>
	);
};

export default DropdownHeader;
