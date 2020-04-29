import React from 'react';
import { getDayFromTodayAsISO } from 'data/dates';

const ResetFilterBtn = (props) => {
	return (
		<button
			className="resetFilterBtn"
			style={{ ...props.style, width: 'auto', height: '2rem' }}
			onClick={() => {
				props.setFilterOptions({
					...props.filterOptions,
					date: '2000-01-01T00:00:00.000Z',
					deadline: getDayFromTodayAsISO(14),
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
