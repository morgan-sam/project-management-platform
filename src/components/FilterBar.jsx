import React from 'react';
import Dropdown from './Dropdown';
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
			<div className="filterBarLabel">Urgency Range:</div>
			<Dropdown
				className="minUrgencyDropdown"
				style={{
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

export default FilterBar;
