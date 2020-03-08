import React, { useEffect, useState } from 'react';
import { capitalizeFirstLetter } from '../processing/utility';

const DateSelect = (props) => {
	const [ listOpen, setListOpen ] = useState(false);
	const [ defaultValue, setDefaultValue ] = useState(props.default);

	const dropdownStyle = {
		height: '2rem',
		width: '5rem',
		border: '1px solid black',
		backgroundColor: '#ccc',
		zIndex: '0',
		textAlign: 'center',
		userSelect: 'none'
	};

	const optionDivs = props.options.map(function(el, i) {
		const display = typeof el === 'string' ? capitalizeFirstLetter(el) : el;
		return (
			<div
				key={i}
				className="dropdownOption"
				style={{ ...dropdownStyle, zIndex: '1' }}
				onMouseDown={() => {
					props.onClick(el);
					setDefaultValue(display);
					setListOpen(false);
				}}
			>
				{display}
			</div>
		);
	});

	useEffect(() => {
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

	return (
		<div className="dropdown" style={{ cursor: 'pointer' }}>
			<div
				className="dropdownHeader"
				style={{ ...dropdownStyle }}
				onMouseDown={(e) => {
					if (e.buttons === 1) setListOpen(!listOpen);
				}}
				onContextMenu={(e) => e.preventDefault()}
			>
				{defaultValue}
			</div>
			{listOpen ? optionDivs : null}
		</div>
	);
};

export default DateSelect;
