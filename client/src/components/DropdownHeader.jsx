import React, { useState, useContext } from 'react';
import ThemeContext from 'context/ThemeContext';
import { capitalizeFirstLetter } from 'processing/utility';
import { dropdownBoxStyle, dropdownHeaderStyle, getHoveredStyle } from 'styling/dropdown';

const DropdownHeader = (props) => {
	const [ hovered, setHovered ] = useState();
	const { listOpen, setListOpen } = props;
	const themeColor = useContext(ThemeContext);
	return (
		<div
			className="dropdownHeader"
			style={{
				...dropdownBoxStyle(listOpen),
				...dropdownHeaderStyle(listOpen)
			}}
			onMouseDown={(e) => {
				if (e.buttons === 1) setListOpen(!listOpen);
			}}
			onContextMenu={(e) => e.preventDefault()}
			onMouseOver={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)}
		>
			<span>{capitalizeFirstLetter(props.default)}</span>
			<div style={{ ...getHoveredStyle(themeColor), opacity: hovered ? '1' : '0' }} />
		</div>
	);
};

export default DropdownHeader;
