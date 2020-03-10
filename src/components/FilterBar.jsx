import React from 'react';
import DateSelect from './DateSelect';
import { filterBarStyle } from '../styling/filterBar';

const FilterBar = (props) => {
	return (
		<div className="filterBar" style={{ ...filterBarStyle, ...props.style }}>
			<div className="filterBarLabel">Date:</div>
			<DateSelect
				setFilterDate={(val) => {
					console.log(val);
					props.setFilterOptions({
						...props.filterOptions,
						date: val
					});
				}}
			/>
			<div className="filterBarLabel">Deadline:</div>
			<DateSelect
				setFilterDate={(val) =>
					props.setFilterOptions({
						...props.filterOptions,
						deadline: val
					})}
			/>
		</div>
	);
};

export default FilterBar;
