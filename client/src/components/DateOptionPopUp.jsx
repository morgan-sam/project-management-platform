import React, { useState } from 'react';
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
	const [ overflowHidden, setOverflowHidden ] = useState(true);

	const onDateSelectDropdownOpen = (boo) => {
		if (boo) {
			setTimeout(() => {
				setOverflowHidden(true);
			}, 10);
		} else setOverflowHidden(false);
	};

	return (
		<div
			style={{
				...dateOptionPopUpStyling,
				overflow: overflowHidden ? 'visible' : 'hidden',
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
						props.setSelectDate(parseDateObjToISO(date));
					}}
					date={props.date}
					onDateSelectDropdownOpen={onDateSelectDropdownOpen}
				/>

				<div className="canConBtnContainer" style={{ ...canConContainerStyle }}>
					<button
						className="cancelButton"
						style={{ ...canConBtnStyle, ...confirmBtnStyle }}
						onClick={() => {
							setShowDateSelect(false);
							props.setSelectDate(parseDateObjToISO(backupDate));
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
