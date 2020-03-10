import React, { useEffect, useState } from 'react';
import { capitalizeFirstLetter } from '../processing/utility';
import {
	dropdownParentStyle,
	dropdownHeaderStyle,
	dropdownBoxStyle,
	dropdownClosedStyle,
	dropdownOpenStyle,
	finalOptionStyle,
	optionStyle
} from '../styling/dropdown';

const Dropdown = (props) => {
	const [ listOpen, setListOpen ] = useState(false);
	const [ defaultValue, setDefaultValue ] = useState(props.default);

	const getCurrentOptionStyle = (index, options) => {
		const max = options.length - 1;
		if (index === max) return { ...optionStyle, ...finalOptionStyle };
		else return optionStyle;
	};

	const optionDivs = props.options
		? props.options.map(function(el, i) {
				const currentOptionStyle = getCurrentOptionStyle(i, props.options);
				const display = typeof el === 'string' ? capitalizeFirstLetter(el) : el;
				return (
					<div
						key={i}
						className="dropdownOption"
						style={{ ...dropdownBoxStyle, ...currentOptionStyle }}
						onMouseDown={() => {
							props.onClick(el);
							setDefaultValue(display);
							setListOpen(false);
						}}
					>
						{display}
					</div>
				);
			})
		: null;

	useEffect(() => {
		checkIfOptionOOB();
		if (listOpen) {
			document.addEventListener('mousedown', whileDropdownOpenClick);
		} else {
			document.removeEventListener('mousedown', whileDropdownOpenClick);
		}
		return () => document.removeEventListener('mousedown', whileDropdownOpenClick);
	});

	const whileDropdownOpenClick = (e) => {
		if (e.target.className === 'dropdown') {
			return;
		}
		setListOpen(false);
	};

	const checkIfOptionOOB = () => {
		if (props.options.indexOf(defaultValue) === -1) {
			const lastValue = props.options[props.options.length - 1];
			setDefaultValue(lastValue);
			props.onClick(lastValue);
		}
	};

	return (
		<div className="dropdown" style={dropdownParentStyle}>
			<div className="dropdownContainer" style={listOpen ? dropdownOpenStyle : dropdownClosedStyle}>
				<div
					className="dropdownHeader"
					style={{ ...dropdownBoxStyle, ...dropdownHeaderStyle }}
					onMouseDown={(e) => {
						if (e.buttons === 1) setListOpen(!listOpen);
					}}
					onContextMenu={(e) => e.preventDefault()}
				>
					{defaultValue}
				</div>
				{listOpen ? optionDivs : null}
			</div>
			<div
				style={{
					...dropdownBoxStyle,
					display: listOpen ? 'block' : 'none'
				}}
			>
				{'▼'}
			</div>
		</div>
	);
};

export default Dropdown;
