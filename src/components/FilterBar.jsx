import React from 'react';
import DateSelect from './DateSelect';

const FilterBar = (props) => {
	const filterBarStyle = {
		display: 'flex',
		flexDirection: 'row'
	};

	return (
		<div className="filterBar" style={{ ...filterBarStyle, ...props.style }}>
			<div className="filterBarLabel">Start Date:</div>
			<DateSelect />
			<div className="filterBarLabel">End Date:</div>
			<DateSelect />
		</div>
	);
};

export default FilterBar;
