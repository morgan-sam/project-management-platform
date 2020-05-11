import React, { useEffect, useState, useContext, useRef } from 'react';
import ThemeContext from 'context/ThemeContext';
import { capitalizeFirstLetter } from 'processing/utility';
import {
	dropdownBoxStyle,
	dropdownHeaderStyle,
	getHoveredStyle,
	getDropdownTextStyle,
	optionBackgroundStyle
} from 'styling/dropdown';

const DropdownHeader = (props) => {
	const headerRef = useRef(null);
	const [ hovered, setHovered ] = useState();
	const { listOpen, setListOpen, hoverEnabled } = props;
	const themeColor = useContext(ThemeContext);

	useEffect(
		() => {
			//check if mouseover with no movement once hover enabled
			if (headerRef && headerRef.current && headerRef.current.querySelector(':hover')) {
				setHovered(true);
			}
		},
		[ hoverEnabled ]
	);

	return (
		<div
			ref={headerRef}
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
				if (hoverEnabled) setHovered(true);
			}}
			onMouseLeave={() => setHovered(false)}
		>
			<span style={getDropdownTextStyle(themeColor, hoverEnabled && hovered)}>
				{capitalizeFirstLetter(props.default)}
			</span>
			<div
				style={{
					...optionBackgroundStyle,
					...getHoveredStyle(themeColor),
					opacity: hoverEnabled && hovered ? '1' : '0'
				}}
			/>
		</div>
	);
};

export default DropdownHeader;
