import React, { useEffect, useState } from 'react';
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
	const [ selectedDate, setSelectedDate ] = useState(props.date);
	const [ backupDate, setBackupDate ] = useState(props.date);
	const [ showDateSelect, setShowDateSelect ] = useState(false);

	useEffect(
		() => {
			props.setFilterDate(parseDateObjToISO(selectedDate));
		},
		[ selectedDate ]
	);

	return (
		<div style={dateOptionPopUpStyling}>
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
				}}
				date={selectedDate}
			/>

			<div
				className="canConBtnContainer"
				style={{ ...canConContainerStyle, display: showDateSelect ? 'flex' : 'none' }}
			>
				<button
					className="cancelButton"
					style={{ ...canConBtnStyle, ...confirmBtnStyle }}
					onClick={() => {
						setShowDateSelect(false);
						setSelectedDate(backupDate);
						props.setFilterDate(parseDateObjToISO(backupDate));
					}}
				>
					X
				</button>
				<button
					className="confirmButton"
					style={{ ...canConBtnStyle, ...cancelBtnStyle }}
					onClick={() => {
						setShowDateSelect(false);
						setBackupDate(selectedDate);
					}}
				>
					✓
				</button>
			</div>
		</div>
	);
};

export default DateOptionPopUp;
