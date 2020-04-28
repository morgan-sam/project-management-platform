import React, { useEffect, useState } from 'react';
import DateSelect from 'components/DateSelect';
import { parseDateObjToISO } from 'processing/parseDates';
import {
	dateOptionPopUpStyling,
	dateDisplayBoxStyling,
	datePopUpStyling,
	canConBtnStyle,
	confirmBtnStyle,
	cancelBtnStyle,
	canConContainerStyle,
	dateSelectConfirmContainerStyling
} from 'styling/dateOption';
import {
	dateOptionOpen,
	dateOptionClosed,
	displayOffscreen,
	displayOnscreen,
	selectOffscreen,
	selectOnscreen
} from 'styling/dateOptionPopUp';

const DateOptionPopUp = (props) => {
	const [ backupDate, setBackupDate ] = useState(props.date);
	const [ showDateSelect, setShowDateSelect ] = useState(false);

	return (
		<div
			style={{
				...dateOptionPopUpStyling,
				...(showDateSelect ? dateOptionOpen : dateOptionClosed)
			}}
		>
			<div
				style={{
					...dateDisplayBoxStyling,
					...(showDateSelect ? displayOffscreen : displayOnscreen)
				}}
				onClick={() => setShowDateSelect(true)}
			>
				{props.date.day}/{props.date.month}/{props.date.year}
			</div>

			<div
				className="dateSelectConfirmContainer"
				style={{ ...dateSelectConfirmContainerStyling, ...(showDateSelect ? selectOnscreen : selectOffscreen) }}
			>
				<DateSelect
					style={{
						...datePopUpStyling
					}}
					setDate={(date) => {
						props.setFilterDate(parseDateObjToISO(date));
					}}
					date={props.date}
				/>

				<div className="canConBtnContainer" style={{ ...canConContainerStyle }}>
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
		</div>
	);
};

export default DateOptionPopUp;
