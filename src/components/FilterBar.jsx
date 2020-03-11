import React from 'react';
import Dropdown from './Dropdown';
import UrgencyRangeSelect from './UrgencyRangeSelect';
import DateOptionPopUp from './DateOptionPopUp';
import { filterBarStyle } from '../styling/filterBar';
import { parseISOToDateObj } from '../processing/parseDates';

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
			<DateOptionPopUp
				setFilterDate={(val) => {
					props.setFilterOptions({
						...props.filterOptions,
						date: val
					});
				}}
				date={parseISOToDateObj(props.filterOptions.date)}
			/>
			<div className="filterBarLabel">Deadline:</div>
			<DateOptionPopUp
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
					width: '7rem'
				}}
				default={props.filterOptions.completion}
				options={[ 'all', 'complete', 'incomplete' ]}
				onClick={(val) =>
					props.setFilterOptions({
						...props.filterOptions,
						completion: val
					})}
			/>
			<UrgencyRangeSelect {...props} />
		</div>
	);
};

export default FilterBar;
