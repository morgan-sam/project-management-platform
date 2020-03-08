import React from 'react';
import Dropdown from './Dropdown';

const DateSelect = (props) => {
	return (
		<div className="dateSelect" style={{ display: 'flex' }}>
			<Dropdown
				style={{ margin: '0 0.5rem' }}
				options={[
					'January',
					'February',
					'March',
					'April',
					'May',
					'June',
					'July',
					'August',
					'September',
					'October',
					'November',
					'December'
				]}
			/>
			<Dropdown style={{ margin: '0 0.5rem' }} options={[ 1, 2, 3, 4 ]} />
			<Dropdown style={{ margin: '0 0.5rem' }} options={[ 'A', 'B', 'C', 'D' ]} />
		</div>
	);
};

export default DateSelect;
