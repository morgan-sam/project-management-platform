import React, { useEffect, useState } from 'react';

const DateSelect = (props) => {
	const [ listOpen, setListOpen ] = useState(false);
	const [ defaultValue, setDefaultValue ] = useState(props.placeholder);
	const [ hoveredOption, setHoveredOption ] = useState(null);

	const dropdownStyle = {
		height: '2rem',
		width: '5rem',
		border: '1px solid black',
		backgroundColor: '#ccc',
		zIndex: '2'
	};

	const optionDivs = props.options.map((el, i) => (
		<div key={i} className="dropdownOption" style={{ ...dropdownStyle, position: 'relative' }} />
	));

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
				style={{ ...dropdownStyle, position: 'relative' }}
				onMouseDown={(e) => {
					if (e.buttons === 1) setListOpen(!listOpen);
				}}
				onContextMenu={(e) => e.preventDefault()}
			/>
			{listOpen ? optionDivs : null}
		</div>
	);
};

export default DateSelect;
