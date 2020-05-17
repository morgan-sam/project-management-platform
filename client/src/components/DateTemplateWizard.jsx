import React from 'react';
import DateSelect from 'components/DateSelect';
import Checkbox from 'components/Checkbox';
import { getDayFromTodayAsISO } from 'data/dates';
import { parseISOToDateObj } from 'processing/parseDates';

import { cancelButtonStyle, containerStyle } from 'styling/batchNewTasks';
import { useState } from 'react';

const DateTemplateWizard = (props) => {
	const { setScreen } = props;
	const [ date, setDate ] = useState(parseISOToDateObj(getDayFromTodayAsISO()));
	const [ forward, setForwards ] = useState(true);

	const sequenceContainer = {
		display: 'grid',
		gridTemplateColumns: 'repeat(2, 1fr)',
		gridTemplateRows: 'repeat(2, 1fr)',
		gridGap: '1rem',
		padding: '1rem'
	};

	return (
		<div
			style={{
				...containerStyle,
				height: '10rem',
				width: '20rem'
			}}
		>
			<div>Initial Date:</div>
			<DateSelect date={date} setDate={setDate} />
			<div>Sequence:</div>

			<div style={sequenceContainer}>
				<div style={{ gridArea: '1 / 1 / 2 / 2' }}>Forward:</div>
				<Checkbox style={{ gridArea: '1 / 2 / 2 / 3' }} default={forward} onChange={() => setForwards(true)} />
				<div style={{ gridArea: ' 2 / 1 / 3 / 2' }}>Backwards:</div>
				<Checkbox
					style={{ gridArea: ' 2 / 2 / 3 / 3' }}
					default={!forward}
					onChange={() => setForwards(false)}
				/>
			</div>
			<button style={cancelButtonStyle} onClick={() => setScreen('main')}>
				×
			</button>
		</div>
	);
};

export default DateTemplateWizard;
