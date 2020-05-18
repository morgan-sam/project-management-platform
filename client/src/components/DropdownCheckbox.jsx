import React, { useEffect, useState, useContext, useRef } from 'react';
import ThemeContext from 'context/ThemeContext';
import Checkbox from 'components/Checkbox';
import { capitalizeFirstLetter } from 'processing/utility';
import {
	dropdownBoxStyle,
	getDropdownTextStyle,
	optionBackgroundStyle,
	getHoveredStyle,
	getDefaultStyle
} from 'styling/dropdown';

const DropdownCheckbox = (props) => {
	const entryRef = useRef(null);
	const [ hovered, setHovered ] = useState();
	const { listOpen, onClick, value, hoverEnabled, selected } = props;
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
			onMouseOver={() => {
				if (hoverEnabled) setHovered(true);
			}}
			onMouseLeave={() => setHovered(false)}
		>
			<span style={{ color: 'black' }} className="dropdown">
				{typeof value === 'string' && value.match(/^[a-z]/) ? capitalizeFirstLetter(value) : value}
			</span>
			<Checkbox
				default={selected}
				style={{ paddingLeft: '1rem' }}
				className="dropdown"
				onChange={() => onClick(value)}
			/>

			<div
				className="dropdown"
				style={{
					...optionBackgroundStyle,
					backgroundColor: 'white',
					zIndex: '-1'
				}}
			/>
		</div>
	);
};

export default DropdownCheckbox;
