import React from 'react';
import { getBoundaryDates } from 'data/dates';
import { parseISOToZeroTime } from 'processing/parseDates';

const ResetFilterBtn = (props) => {
	const boundaryDates = getBoundaryDates(props.rawTaskList);
	return (
		<button
			className="resetFilterBtn"
			style={{ ...props.style, width: 'auto', height: '2rem' }}
			onClick={() => {
				props.setFilterOptions({
					...props.filterOptions,
					date: parseISOToZeroTime(boundaryDates.date),
					deadline: parseISOToZeroTime(boundaryDates.deadline),
					completion: 'all',
					urgency: { min: 1, max: 5 },
					teams: 'all'
				});
			}}
		>
			Reset Filter
		</button>
	);
};

export default ResetFilterBtn;
