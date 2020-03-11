import React, { useState } from 'react';
import DateSelect from './DateSelect';
import { parseDateObjToISO } from '../processing/parseDates';

const DateOptionPopUp = (props) => {
	const [ selectedDate, setSelectedDate ] = useState('test');

	return (
		<div>
			<div>
				{selectedDate.day}/{selectedDate.month}/{selectedDate.year}
			</div>
			<DateSelect
				setDate={(date) => {
					setSelectedDate(date);
					props.setFilterDate(parseDateObjToISO(date));
				}}
			/>
		</div>
	);
};

export default DateOptionPopUp;
