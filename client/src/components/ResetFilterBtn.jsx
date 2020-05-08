import React from 'react';
import ColorButton from 'components/ColorButton';
import { getBoundaryDates } from 'data/dates';
import { parseISOToZeroTime } from 'processing/parseDates';

const ResetFilterBtn = (props) => {
	const boundaryDates = getBoundaryDates(props.rawTaskList);
	return (
		<ColorButton
			className="resetFilterBtn"
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
			text={'Reset Filter'}
		/>
	);
};

export default ResetFilterBtn;
