import React, { useState } from 'react';
import DateSelect from './DateSelect';
import { parseDateObjToISO } from '../processing/parseDates';
import { dateDisplayBoxStyling, datePopUpStyling } from '../styling/dateOption';

const DateOptionPopUp = (props) => {
	const [ selectedDate, setSelectedDate ] = useState('test');

	return (
		<div>
			<div style={dateDisplayBoxStyling}>
				{selectedDate.day}/{selectedDate.month}/{selectedDate.year}
			</div>
			<DateSelect
				style={datePopUpStyling}
				setDate={(date) => {
					setSelectedDate(date);
					props.setFilterDate(parseDateObjToISO(date));
				}}
			/>
		</div>
	);
};

export default DateOptionPopUp;
