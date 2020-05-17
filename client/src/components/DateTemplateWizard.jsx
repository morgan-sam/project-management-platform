import React from 'react';
import DateSelect from 'components/DateSelect';
import Checkbox from 'components/Checkbox';
import Dropdown from 'components/Dropdown';
import ColorButton from 'components/ColorButton';
import { getDayFromTodayAsISO } from 'data/dates';
import { parseISOToDateObj } from 'processing/parseDates';

import { cancelButtonStyle, containerStyle } from 'styling/batchNewTasks';
import { useState } from 'react';

const DateTemplateWizard = (props) => {
	const { setScreen, colorTheme, setTemplate, template, screen } = props;
	const [ date, setDate ] = useState(parseISOToDateObj(getDayFromTodayAsISO()));
	const [ sequence, setSequence ] = useState('none');
	const [ step, setStep ] = useState('d');
	const [ amount, setAmount ] = useState(1);

	const parentContainer = {
		display: 'grid',
		gridTemplateColumns: 'repeat(2, 1fr)',
		gridTemplateRows: 'repeat(3, 1fr)',
		padding: '3rem'
	};

	const categoryStyle = {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		padding: '1rem',
		textAlign: 'center'
	};

	const getRightHandContainerStyle = (sequence) => {
		return {
			opacity: sequence === 'none' ? '0.3' : '1',
			pointerEvents: sequence === 'none' ? 'none' : 'auto'
		};
	};

	const dateContainer = {
		...categoryStyle,
		gridArea: '1 / 1 / 4 / 2'
	};

	const sequenceContainer = {
		...categoryStyle,
		gridArea: '4 / 1 / 7 / 2'
	};

	const stepContainer = {
		...categoryStyle,
		...getRightHandContainerStyle(sequence),
		gridArea: '1 / 2 / 4 / 3'
	};

	const amountContainer = {
		...categoryStyle,
		...getRightHandContainerStyle(sequence),
		gridArea: '4 / 2 / 7 / 3'
	};

	const bottomContainer = {
		gridArea: '7 / 1 / 9 / 3',
		padding: '2rem',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center'
	};

	const sequenceSubContainer = {
		display: 'grid',
		gridTemplateColumns: 'repeat(2, 1fr)',
		gridTemplateRows: 'repeat(2, 1fr)',
		gridGap: '1rem',
		padding: '1rem'
	};

	const stepSubContainer = {
		display: 'grid',
		gridTemplateColumns: 'repeat(2, 1fr)',
		gridTemplateRows: 'repeat(4, 1fr)',
		gridGap: '1rem',
		padding: '1rem'
	};
	const containerItemStyle = {
		padding: '1rem'
	};

	const generateDateTemplate = () => {
		let template = '${';
		template += Object.values(date).join('/');
		template += '}';
		if (sequence === 'none') return template;
		template += sequence;
		template += amount;
		template += `n${step}`;
		return template;
	};

	const shortStepToFull = (step) => {
		if (step === 'd') return 'Day';
		if (step === 'w') return 'Week';
		if (step === 'm') return 'Month';
		if (step === 'y') return 'Year';
	};

	return (
		<div style={{ ...containerStyle, ...parentContainer }}>
			<div style={dateContainer}>
				<div style={containerItemStyle}>Initial Date:</div>
				<DateSelect
					date={date}
					setDate={setDate}
					style={{
						...containerItemStyle,
						zIndex: '10'
					}}
				/>
			</div>
			<div style={sequenceContainer}>
				<div style={containerItemStyle}>Sequence:</div>
				<div style={{ ...sequenceSubContainer, ...containerItemStyle }}>
					<div style={{ gridArea: '1 / 1 / 2 / 2' }}>None:</div>
					<Checkbox
						style={{ gridArea: '1 / 2 / 2 / 3' }}
						default={sequence === 'none'}
						onChange={() => setSequence('none')}
					/>
					<div style={{ gridArea: ' 2 / 1 / 3 / 2' }}>Forwards:</div>
					<Checkbox
						style={{ gridArea: ' 2 / 2 / 3 / 3' }}
						default={sequence === '+'}
						onChange={() => setSequence('+')}
					/>
					<div style={{ gridArea: ' 3 / 1 / 4 / 2' }}>Backwards:</div>
					<Checkbox
						style={{ gridArea: ' 3 / 2 / 4 / 3' }}
						default={sequence === '-'}
						onChange={() => setSequence('-')}
					/>
				</div>
			</div>
			<div style={stepContainer}>
				<div style={containerItemStyle}>Step:</div>
				<div style={{ ...stepSubContainer, ...containerItemStyle }}>
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
			<div style={amountContainer}>
				<div style={containerItemStyle}>{`Amount Of ${shortStepToFull(step)}s:`}</div>
				<Dropdown
					className="dropdown"
					default={amount}
					style={{
						alignItems: 'center',
						zIndex: '9',
						width: '2rem',
						padding: '3rem'
					}}
					options={[ ...Array(11).keys() ].slice(1)}
					onClick={(val) => setAmount(val)}
				/>
			</div>
			<div style={bottomContainer}>
				<ColorButton
					color={colorTheme}
					text={'Generate Template'}
					onClick={() => {
						const dateTemplate = generateDateTemplate();
						if (screen === 'dateWizard') setTemplate({ ...template, date: dateTemplate });
						if (screen === 'deadlineWizard') setTemplate({ ...template, deadline: dateTemplate });
						setScreen('main');
					}}
				/>
			</div>
			<button style={cancelButtonStyle} onClick={() => setScreen('main')}>
				×
			</button>
		</div>
	);
};

export default DateTemplateWizard;
