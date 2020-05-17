import React from 'react';
import DateSelect from 'components/DateSelect';
import Checkbox from 'components/Checkbox';
import ColorButton from 'components/ColorButton';
import { getDayFromTodayAsISO } from 'data/dates';
import { parseISOToDateObj } from 'processing/parseDates';

import { cancelButtonStyle, containerStyle } from 'styling/batchNewTasks';
import { useState } from 'react';

const DateTemplateWizard = (props) => {
	const { setScreen, colorTheme } = props;
	const [ date, setDate ] = useState(parseISOToDateObj(getDayFromTodayAsISO()));
	const [ forward, setForwards ] = useState(true);
	const [ step, setStep ] = useState('day');

	const sequenceContainer = {
		display: 'grid',
		gridTemplateColumns: 'repeat(2, 1fr)',
		gridTemplateRows: 'repeat(2, 1fr)',
		gridGap: '1rem',
		padding: '1rem'
	};

	const stepContainer = {
		display: 'grid',
		gridTemplateColumns: 'repeat(2, 1fr)',
		gridTemplateRows: 'repeat(4, 1fr)',
		gridGap: '1rem',
		padding: '1rem'
	};

	const containerItemStyle = {
		padding: '1rem'
	};

	const categoryStyle = {
		padding: '1rem',
		textAlign: 'center'
	};

	return (
		<div style={containerStyle}>
			<div style={categoryStyle}>
				<div style={containerItemStyle}>Initial Date:</div>
				<DateSelect date={date} setDate={setDate} style={containerItemStyle} />
			</div>
			<div style={categoryStyle}>
				<div style={containerItemStyle}>Sequence:</div>
				<div style={{ ...sequenceContainer, ...containerItemStyle }}>
					<div style={{ gridArea: '1 / 1 / 2 / 2' }}>Forward:</div>
					<Checkbox
						style={{ gridArea: '1 / 2 / 2 / 3' }}
						default={forward}
						onChange={() => setForwards(true)}
					/>
					<div style={{ gridArea: ' 2 / 1 / 3 / 2' }}>Backwards:</div>
					<Checkbox
						style={{ gridArea: ' 2 / 2 / 3 / 3' }}
						default={!forward}
						onChange={() => setForwards(false)}
					/>
				</div>
			</div>
			<div style={categoryStyle}>
				<div style={containerItemStyle}>Step:</div>
				<div style={{ ...stepContainer, ...containerItemStyle }}>
					<div style={{ gridArea: '1 / 1 / 2 / 2' }}>Day:</div>
					<Checkbox
						style={{ gridArea: '1 / 2 / 2 / 3' }}
						default={step === 'day'}
						onChange={() => setStep('day')}
					/>
					<div style={{ gridArea: '2 / 1 / 3 / 2' }}>Week:</div>
					<Checkbox
						style={{ gridArea: '2 / 2 / 3 / 3' }}
						default={step === 'week'}
						onChange={() => setStep('week')}
					/>
					<div style={{ gridArea: ' 3 / 1 / 4 / 2' }}>Month:</div>
					<Checkbox
						style={{ gridArea: ' 3 / 2 / 4 / 3' }}
						default={step === 'month'}
						onChange={() => setStep('month')}
					/>
					<div style={{ gridArea: '4 / 1 / 5 / 2' }}>Year:</div>
					<Checkbox
						style={{ gridArea: '4 / 2 / 5 / 3' }}
						default={step === 'year'}
						onChange={() => setStep('year')}
					/>
				</div>
			</div>
			<div style={{ padding: '2rem' }}>
				<ColorButton color={colorTheme} text={'Generate Template'} />
			</div>
			<button style={cancelButtonStyle} onClick={() => setScreen('main')}>
				×
			</button>
		</div>
	);
};

export default DateTemplateWizard;
