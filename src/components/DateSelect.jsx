import React, { useState, useEffect } from 'react';
import Dropdown from './Dropdown';
import { getMonthIntegers, arrayOfMonthDays, get21stCenturyYears } from '../data/dates';
import { dateSelectStyle } from '../styling/dateSelect';
import { parseDateObjToISO } from '../processing/parseDates';

const DateSelect = (props) => {
	const [ selectedDay, setSelectedDay ] = useState(1);
	const [ selectedMonth, setSelectedMonth ] = useState('January');
	const [ selectedYear, setSelectedYear ] = useState(2020);

	const passDateToParentAsISO = (val) => {
		const dateObj = {
			day: selectedDay,
			month: selectedMonth,
			year: selectedYear,
			...val
		};
		const dateISO = parseDateObjToISO(dateObj);
		props.setFilterDate(dateISO);
	};

	return (
		<div className="dateSelect" style={dateSelectStyle}>
			<div className="dropdownLabel">Day</div>
			<div className="dropdownLabel">Month</div>
			<div className="dropdownLabel">Year</div>
			<Dropdown
				default={selectedDay}
				options={arrayOfMonthDays(selectedMonth, selectedYear)}
				onClick={(val) => {
					setSelectedDay(val);
					passDateToParentAsISO({ day: val });
				}}
			/>
			<Dropdown
				default={selectedMonth}
				options={getMonthIntegers()}
				onClick={(val) => {
					setSelectedMonth(val);
					passDateToParentAsISO({ month: val });
				}}
			/>
			<Dropdown
				default={selectedYear}
				options={get21stCenturyYears()}
				onClick={(val) => {
					setSelectedYear(val);
					passDateToParentAsISO({ year: val });
				}}
			/>
		</div>
	);
};

export default DateSelect;
