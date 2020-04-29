import React from 'react';
import DateOptionPopUp from 'components/DateOptionPopUp';

const DateRangeSelect = (props) => {
	const elStyle = { margin: '0 1rem' };
	return (
		<div className="DateRangeSelect" style={props.style}>
			<div className="filterBarLabel" style={elStyle}>
				Date:
			</div>
			<DateOptionPopUp style={elStyle} setSelectDate={(val) => props.setDate(val)} date={props.date} />
			<div className="filterBarLabel" style={elStyle}>
				Deadline:
			</div>
			<DateOptionPopUp style={elStyle} setSelectDate={(val) => props.setDeadline(val)} date={props.deadline} />
		</div>
	);
};

export default DateRangeSelect;
