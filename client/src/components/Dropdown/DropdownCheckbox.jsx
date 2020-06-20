import React, { useRef } from 'react';
import Checkbox from 'components/Checkbox';
import { capitalizeFirstLetter } from 'processing/utility';
import { dropdownBoxStyle, optionBackgroundStyle } from 'styling/dropdown';

const DropdownCheckbox = (props) => {
	const entryRef = useRef(null);
	const { listOpen, onClick, value, selected } = props;

	const displayString = typeof value === 'string' && value.match(/^[a-z]/) ? capitalizeFirstLetter(value) : value;

	return (
		<div
			ref={entryRef}
			className="dropdownOption"
			style={{
				...dropdownBoxStyle(listOpen),
				...props.style
			}}
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
