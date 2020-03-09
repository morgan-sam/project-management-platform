import React, { useEffect, useState } from 'react';
import Dropdown from './Dropdown';
import { months, arrayOfMonthDays, get21stCenturyYears } from '../data/dates';

const DateSelect = (props) => {
	const [ selectedDay, setSelectedDay ] = useState(1);
	const [ selectedMonth, setSelectedMonth ] = useState('January');
	const [ selectedYear, setSelectedYear ] = useState(2020);

	console.log(selectedDay, selectedMonth, selectedYear);

	return (
		<div className="dateSelect" style={{ display: 'flex' }}>
			<Dropdown
				default={selectedDay}
				options={arrayOfMonthDays(selectedMonth, selectedYear)}
				onClick={(val) => setSelectedDay(val)}
			/>
			<Dropdown default={selectedMonth} options={months()} onClick={(val) => setSelectedMonth(val)} />
			<Dropdown default={selectedYear} options={get21stCenturyYears()} onClick={(val) => setSelectedYear(val)} />
		</div>
	);
};

export default DateSelect;
