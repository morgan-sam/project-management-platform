import React from 'react';
import Dropdown from './Dropdown';

const UrgencyRangeSelect = (props) => {
	const elStyle = { margin: '0 0.3rem' };
	return (
		<div>
			<div className="filterBarLabel" style={elStyle}>
				Urgency Range:
			</div>
			<Dropdown
				className="minUrgencyDropdown"
				style={{
					...elStyle,
					width: '2rem'
				}}
				default={props.filterOptions.urgency.min}
				options={[ 1, 2, 3, 4, 5 ]}
				onClick={(val) => {
					const newVal = val > props.filterOptions.urgency.max ? props.filterOptions.urgency.max : val;
					props.setFilterOptions({
						...props.filterOptions,
						urgency: {
							...props.filterOptions.urgency,
							min: newVal
						}
					});
				}}
			/>
			<Dropdown
				className="maxUrgencyDropdown"
				style={{
					...elStyle,
					width: '2rem'
				}}
				default={props.filterOptions.urgency.max}
				options={[ 1, 2, 3, 4, 5 ]}
				onClick={(val) => {
					const newVal = val < props.filterOptions.urgency.min ? props.filterOptions.urgency.min : val;
					props.setFilterOptions({
						...props.filterOptions,
						urgency: {
							...props.filterOptions.urgency,
							max: newVal
						}
					});
				}}
			/>
		</div>
	);
};

export default UrgencyRangeSelect;
