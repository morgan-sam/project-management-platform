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

	const displayString = typeof value === 'string' && value.match(/^[a-z]/) ? capitalizeFirstLetter(value) : value;

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
			onClick={() => onClick(value)}
		>
			<div style={{ display: 'flex', width: '100%' }}>
				<div style={{ color: 'black', width: '100%' }} className="dropdown">
					{displayString.length > 8 ? `${displayString.substr(0, 8)}...` : displayString}
				</div>
				<Checkbox default={selected} style={{ width: '2.5rem' }} className="dropdown" onChange={() => null} />
			</div>

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
