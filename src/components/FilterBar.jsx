import React from 'react';
import DateSelect from './DateSelect';

const FilterBar = (props) => {
	const filterBarStyle = {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center'
	};

	return (
		<div className="filterBar" style={{ ...filterBarStyle, ...props.style }}>
			<div>Start Date:</div>
			<DateSelect />
			<div>End Date:</div>
			<DateSelect />
		</div>
	);
};

export default FilterBar;
