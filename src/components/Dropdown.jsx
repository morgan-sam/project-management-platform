import React, { useEffect, useState } from 'react';

const DateSelect = (props) => {
	const [ listOpen, setListOpen ] = useState(false);
	const [ defaultValue, setDefaultValue ] = useState(props.default);

	const dropdownStyle = {
		height: '2rem',
		width: '5rem',
		border: '1px solid black',
		backgroundColor: '#ccc',
		zIndex: '0',
		textAlign: 'center'
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

	function capitalizeFirstLetter(str) {
		if (str.length > 0) return str[0].toUpperCase() + str.slice(1);
		else return str;
	}

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
		<div className="dropdown">
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
