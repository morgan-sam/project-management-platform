import React, { useState } from 'react';
import DateSelect from './DateSelect';
import { parseDateObjToISO } from '../processing/parseDates';
import { dateOptionPopUpStyling, dateDisplayBoxStyling, datePopUpStyling } from '../styling/dateOption';

const DateOptionPopUp = (props) => {
	const [ selectedDate, setSelectedDate ] = useState('test');
	const [ showDateSelect, setShowDateSelect ] = useState(false);

	return (
		<div style={dateOptionPopUpStyling} onMouseLeave={() => setShowDateSelect(false)}>
			<div
				style={{ ...dateDisplayBoxStyling, display: showDateSelect ? 'none' : 'flex' }}
				onClick={() => setShowDateSelect(true)}
			>
				{selectedDate.day}/{selectedDate.month}/{selectedDate.year}
			</div>
			<DateSelect
				style={{
					...datePopUpStyling,
					display: showDateSelect ? 'grid' : 'none',
					border: '1px solid black'
				}}
				setDate={(date) => {
					setSelectedDate(date);
					props.setFilterDate(parseDateObjToISO(date));
				}}
			/>
		</div>
	);
};

export default DateOptionPopUp;
