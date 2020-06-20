import React, { useState } from 'react';
import DateSelect from 'components/DateSelect';
import { parseDateObjToISO } from 'processing/dates';
import {
	dateOptionSlideStyling,
	dateDisplayBoxStyling,
	dateSlideStyling,
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
} from 'styling/dateOptionSlide';

const DateOptionSlide = (props) => {
	const [ internalDateChange, setInternalDateChange ] = useState(false);
	const [ backupDate, setBackupDate ] = useState(props.date);
	const [ showDateSelect, setShowDateSelect ] = useState(false);
	const [ overflowHidden, setOverflowHidden ] = useState(true);

	return (
		<div
			style={{
				...dateOptionSlideStyling,
				overflow: overflowHidden ? 'visible' : 'hidden',
				...(showDateSelect ? dateOptionOpen : dateOptionClosed)
			}}
		>
			<div
				style={{
					...dateDisplayBoxStyling,
					...(showDateSelect ? displayOffscreen : displayOnscreen)
				}}
				onClick={() => {
					setShowDateSelect(true);
					if (props.setPopUpOpen) props.setPopUpOpen(true);
				}}
			>
				{props.date.day}/{props.date.month}/{props.date.year}
			</div>

			<div
				className="dateSelectConfirmContainer"
				style={{ ...dateSelectConfirmContainerStyling, ...(showDateSelect ? selectOnscreen : selectOffscreen) }}
			>
				<DateSelect
					style={{
						...dateSlideStyling
					}}
					setDate={(date) => {
						setInternalDateChange(true);
						props.setSelectDate(parseDateObjToISO(date));
					}}
					date={props.date}
					setOverflowHidden={(val) => {
						props.setOverflowHidden(val);
						setOverflowHidden(val);
					}}
				/>

				<div className="canConBtnContainer" style={{ ...canConContainerStyle }}>
					<button
						className="cancelButton"
						style={{ ...canConBtnStyle, ...cancelBtnStyle }}
						onClick={() => {
							setShowDateSelect(false);
							if (props.setPopUpOpen) props.setPopUpOpen(false);
							if (internalDateChange) props.setSelectDate(parseDateObjToISO(backupDate));
							setInternalDateChange(false);
						}}
						tabIndex="-1"
					>
						×
					</button>
					<button
						className="confirmButton"
						style={{ ...canConBtnStyle, ...confirmBtnStyle }}
						onClick={() => {
							setShowDateSelect(false);
							if (props.setPopUpOpen) props.setPopUpOpen(false);
							setBackupDate(props.date);
							setInternalDateChange(false);
						}}
						tabIndex="-1"
					>
						✓
					</button>
				</div>
			</div>
		</div>
	);
};

export default DateOptionSlide;
