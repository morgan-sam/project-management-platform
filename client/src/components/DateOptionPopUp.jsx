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
} from '../styling/dateOption';

const DateOptionPopUp = (props) => {
	const [ backupDate, setBackupDate ] = useState(props.date);
	const [ showDateSelect, setShowDateSelect ] = useState(false);

	const dateOptionOpen = {
		width: '18rem',
		height: '10rem'
	};

	const dateOptionClosed = {
		width: '7rem',
		height: '3rem'
	};

	const displayOffscreen = {
		position: 'absolute',
		left: '0%',
		top: '50%',
		transform: 'translate(-50%,-50%)',
		zIndex: '5',
		opacity: '0'
	};

	const displayOnscreen = {
		position: 'absolute',
		left: '50%',
		top: '50%',
		transform: 'translate(-50%,-50%)',
		zIndex: '5',
		opacity: '1'
	};

	const selectOffscreen = {
		position: 'absolute',
		left: '0%',
		top: '50%',
		transform: 'translate(50%,-50%)',
		zIndex: '3',
		opacity: '0'
	};

	const selectOnscreen = {
		position: 'absolute',
		left: '50%',
		top: '50%',
		transform: 'translate(-50%,-50%)',
		zIndex: '3',
		opacity: '1'
	};

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
						...datePopUpStyling,
						opacity: showDateSelect ? '1' : '0'
					}}
					setDate={(date) => {
						props.setFilterDate(parseDateObjToISO(date));
					}}
					date={props.date}
				/>

				<div
					className="canConBtnContainer"
					style={{ ...canConContainerStyle, opacity: showDateSelect ? '1' : '0' }}
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
		</div>
	);
};

export default DateOptionPopUp;
