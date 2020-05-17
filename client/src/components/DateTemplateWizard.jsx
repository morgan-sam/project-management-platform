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
	const [ sequence, setSequence ] = useState('none');
	const [ step, setStep ] = useState('d');

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

	const generateDateTemplate = () => {
		let template = '${';
		template += Object.values(date).join('/');
		template += '}';
		if (sequence === 'none') return template;
		template += sequence;
		template += `n${step}`;
		console.log(template);
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
						default={sequence === '+'}
						onChange={() => setSequence('+')}
					/>
					<div style={{ gridArea: ' 2 / 1 / 3 / 2' }}>Backwards:</div>
					<Checkbox
						style={{ gridArea: ' 2 / 2 / 3 / 3' }}
						default={sequence === '-'}
						onChange={() => setSequence('-')}
					/>
					<div style={{ gridArea: ' 3 / 1 / 4 / 2' }}>None:</div>
					<Checkbox
						style={{ gridArea: ' 3 / 2 / 4 / 3' }}
						default={sequence === 'none'}
						onChange={() => setSequence('none')}
					/>
				</div>
			</div>
			{sequence !== 'none' && (
				<div style={categoryStyle}>
					<div style={containerItemStyle}>Step:</div>
					<div style={{ ...stepContainer, ...containerItemStyle }}>
						<div style={{ gridArea: '1 / 1 / 2 / 2' }}>Day:</div>
						<Checkbox
							style={{ gridArea: '1 / 2 / 2 / 3' }}
							default={step === 'd'}
							onChange={() => setStep('d')}
						/>
						<div style={{ gridArea: '2 / 1 / 3 / 2' }}>Week:</div>
						<Checkbox
							style={{ gridArea: '2 / 2 / 3 / 3' }}
							default={step === 'w'}
							onChange={() => setStep('w')}
						/>
						<div style={{ gridArea: ' 3 / 1 / 4 / 2' }}>Month:</div>
						<Checkbox
							style={{ gridArea: ' 3 / 2 / 4 / 3' }}
							default={step === 'm'}
							onChange={() => setStep('m')}
						/>
						<div style={{ gridArea: '4 / 1 / 5 / 2' }}>Year:</div>
						<Checkbox
							style={{ gridArea: '4 / 2 / 5 / 3' }}
							default={step === 'y'}
							onChange={() => setStep('y')}
						/>
					</div>
				</div>
			)}
			<div style={{ padding: '2rem' }}>
				<ColorButton color={colorTheme} text={'Generate Template'} onClick={() => generateDateTemplate()} />
			</div>
			<button style={cancelButtonStyle} onClick={() => setScreen('main')}>
				×
			</button>
		</div>
	);
};

export default DateTemplateWizard;
