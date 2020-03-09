import React, { useEffect, useState } from 'react';
import Dropdown from './Dropdown';
import { months, arrayOfMonthDays, get21stCenturyYears } from '../data/dates';

const DateSelect = (props) => {
	const [ selectedMonth, setSelectedMonth ] = useState('February');
	const [ selectedYear, setSelectedYear ] = useState(2020);

	console.log(arrayOfMonthDays(selectedMonth, selectedYear));
	console.log(selectedMonth);
	console.log(selectedYear);
	return (
		<div className="dateSelect" style={{ display: 'flex' }}>
			<Dropdown onClick={(val) => console.log(`${val} selected.`)} />
			<Dropdown default={selectedMonth} options={months()} onClick={(val) => setSelectedMonth(val)} />
			<Dropdown default={selectedYear} options={get21stCenturyYears()} onClick={(val) => setSelectedYear(val)} />
		</div>
	);
};

export default DateSelect;
