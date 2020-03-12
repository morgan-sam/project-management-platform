import React from 'react';

const ResetFilterBtn = (props) => {
	return (
		<button
			className="resetFilterBtn"
			style={{ width: '5rem', height: '2rem' }}
			onClick={() => {
				props.setFilterOptions({
					active: true,
					date: '2020-01-01T00:00:00.000Z',
					deadline: '2025-01-01T00:00:00.000Z',
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
