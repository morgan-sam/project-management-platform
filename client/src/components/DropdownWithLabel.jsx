import React from 'react';
import Dropdown from 'components/Dropdown';

const DropdownWithLabel = (props) => {
	const containerStyle = {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		margin: '1rem'
	};

	const itemStyle = {
		margin: '1rem'
	};

	return (
		<div style={containerStyle}>
			<div className="dropdownLabel" style={itemStyle}>
				{props.label}:
			</div>
			<Dropdown
				className="dropdown"
				style={{
					itemStyle,
					width: props.width
				}}
				default={props.default}
				options={props.options}
				onClick={(val) => props.onClick(val)}
			/>
		</div>
	);
};

export default DropdownWithLabel;
