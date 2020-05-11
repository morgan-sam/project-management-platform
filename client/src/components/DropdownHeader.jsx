import React, { useState, useContext } from 'react';
import ThemeContext from 'context/ThemeContext';
import { capitalizeFirstLetter } from 'processing/utility';
import { dropdownBoxStyle, dropdownHeaderStyle, getHoveredStyle, getDropdownTextStyle } from 'styling/dropdown';

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
			onMouseOver={() => {
				if (props.hoverEnabled) setHovered(true);
			}}
			onMouseLeave={() => setHovered(false)}
		>
			<span style={getDropdownTextStyle(themeColor, props.hoverEnabled && hovered)}>
				{capitalizeFirstLetter(props.default)}
			</span>
			<div style={{ ...getHoveredStyle(themeColor), opacity: props.hoverEnabled && hovered ? '1' : '0' }} />
		</div>
	);
};

export default DropdownHeader;
