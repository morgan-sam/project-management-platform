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
	const [ backupDate, setBackupDate ] = useState(props.date);
	const [ showDateSelect, setShowDateSelect ] = useState(false);

	return (
		<div style={dateOptionPopUpStyling}>
			<div
				style={{ ...dateDisplayBoxStyling, display: showDateSelect ? 'none' : 'flex' }}
				onClick={() => setShowDateSelect(true)}
			>
				{props.date.day}/{props.date.month}/{props.date.year}
			</div>
			<DateSelect
				style={{
					...datePopUpStyling,
					display: showDateSelect ? 'grid' : 'none'
				}}
				setDate={(date) => {
					props.setFilterDate(parseDateObjToISO(date));
				}}
				date={props.date}
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
						setBackupDate(props.date);
					}}
				>
					✓
				</button>
			</div>
		</div>
	);
};

export default DateOptionPopUp;
