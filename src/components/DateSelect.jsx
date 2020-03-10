import React, { useState } from 'react';
import Dropdown from './Dropdown';
import { getMonthIntegers, arrayOfMonthDays, get21stCenturyYears } from '../data/dates';
import { dateSelectStyle } from '../styling/dateSelect';

const DateSelect = (props) => {
	const [ selectedDay, setSelectedDay ] = useState(1);
	const [ selectedMonth, setSelectedMonth ] = useState('January');
	const [ selectedYear, setSelectedYear ] = useState(2020);

	return (
		<div className="dateSelect" style={dateSelectStyle}>
			<div className="dropdownLabel">Day</div>
			<div className="dropdownLabel">Month</div>
			<div className="dropdownLabel">Year</div>
			<Dropdown
				default={selectedDay}
				options={arrayOfMonthDays(selectedMonth, selectedYear)}
				onClick={(val) => setSelectedDay(val)}
			/>
			<Dropdown default={selectedMonth} options={getMonthIntegers()} onClick={(val) => setSelectedMonth(val)} />
			<Dropdown default={selectedYear} options={get21stCenturyYears()} onClick={(val) => setSelectedYear(val)} />
		</div>
	);
};

export default DateSelect;
