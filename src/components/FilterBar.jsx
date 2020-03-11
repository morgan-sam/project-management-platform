import React from 'react';
import Dropdown from './Dropdown';
import DateRangeSelect from './DateRangeSelect';
import UrgencyRangeSelect from './UrgencyRangeSelect';
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
			<DateRangeSelect {...props} />
			<UrgencyRangeSelect {...props} />
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
		</div>
	);
};

export default FilterBar;
