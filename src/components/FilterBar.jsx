import React from 'react';
import DateSelect from './DateSelect';
import { filterBarStyle } from '../styling/filterBar';

const FilterBar = (props) => {
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
