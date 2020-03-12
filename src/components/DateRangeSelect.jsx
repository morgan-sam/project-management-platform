import React from 'react';
import DateOptionPopUp from './DateOptionPopUp';
import { parseISOToDateObj } from '../processing/parseDates';

const DateRangeSelect = (props) => {
	const elStyle = { margin: '0 1rem' };
	return (
		<div>
			<div className="filterBarLabel" style={elStyle}>
				Date:
			</div>
			<DateOptionPopUp
				style={elStyle}
				setFilterDate={(val) => {
					props.setFilterOptions({
						...props.filterOptions,
						date: val
					});
				}}
				date={parseISOToDateObj(props.filterOptions.date)}
			/>
			<div className="filterBarLabel" style={elStyle}>
				Deadline:
			</div>
			<DateOptionPopUp
				style={elStyle}
				setFilterDate={(val) =>
					props.setFilterOptions({
						...props.filterOptions,
						deadline: val
					})}
				date={parseISOToDateObj(props.filterOptions.deadline)}
			/>
		</div>
	);
};

export default DateRangeSelect;
