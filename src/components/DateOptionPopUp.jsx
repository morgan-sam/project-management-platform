import React, { useState } from 'react';
import DateSelect from './DateSelect';
import { parseDateObjToISO } from '../processing/parseDates';
import {
	dateOptionPopUpStyling,
	dateDisplayBoxStyling,
	datePopUpStyling,
	canConBtnStyle,
	confirmBtnStyle,
	cancelBtnStyle,
	canConContainerStyle
} from '../styling/dateOption';

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
					display: showDateSelect ? 'grid' : 'none'
				}}
				setDate={(date) => {
					setSelectedDate(date);
					props.setFilterDate(parseDateObjToISO(date));
				}}
			/>

			<div
				className="canConBtnContainer"
				style={{ ...canConContainerStyle, display: showDateSelect ? 'flex' : 'none' }}
			>
				<button className="cancelButton" style={{ ...canConBtnStyle, ...confirmBtnStyle }}>
					X
				</button>
				<button className="confirmButton" style={{ ...canConBtnStyle, ...cancelBtnStyle }}>
					✓
				</button>
			</div>
		</div>
	);
};

export default DateOptionPopUp;
