import React from 'react';
import Dropdown from './Dropdown';
import { months, daysInMonth, get21stCenturyYears } from '../data/dates';

const DateSelect = (props) => {
	console.log(months());
	console.log(get21stCenturyYears());
	console.log(daysInMonth(3, 2020));

	return (
		<div className="dateSelect" style={{ display: 'flex' }}>
			<Dropdown onClick={(val) => console.log(`${val} selected.`)} />
			<Dropdown onClick={(val) => console.log(`${val} selected.`)} />
			<Dropdown onClick={(val) => console.log(`${val} selected.`)} />
		</div>
	);
};

export default DateSelect;
