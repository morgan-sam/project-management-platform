import React from 'react';
import Dropdown from './Dropdown';
import DateSelect from './DateSelect';
import { filterBarStyle } from '../styling/filterBar';

const FilterBar = (props) => {
	return (
		<div className="filterBar" style={{ ...filterBarStyle, ...props.style }}>
			<div className="filterBarLabel">Active:</div>
			<input
				type="checkbox"
				className="inputCheckbox"
				onChange={(e) =>
					props.setFilterOptions({
						...props.filterOptions,
						active: e.target.checked
					})}
				defaultChecked={props.filterOptions.active}
			/>
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
			<div className="filterBarLabel">Completed:</div>
			<Dropdown
				className="completionDropdown"
				style={{
					width: '7rem',
					margin: 'auto'
				}}
				default={'All'}
				options={[ 'All', 'Complete', 'Incomplete' ]}
				onClick={(val) =>
					props.setFilterOptions({
						...props.filterOptions,
						completion: val.toLowerCase()
					})}
			/>
		</div>
	);
};

export default FilterBar;
