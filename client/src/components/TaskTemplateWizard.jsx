import React, { useState } from 'react';
import InputFormWithLabel from 'components/InputFormWithLabel';
import Checkbox from 'components/Checkbox';
import Dropdown from 'components/Dropdown';
import ColorButton from 'components/ColorButton';
import { cancelButtonStyle, containerStyle, titleStyle } from 'styling/batchNewTasks';

const TaskTemplateWizard = (props) => {
	const { setScreen, colorTheme, setTemplate, template } = props;
	const [ name, setName ] = useState('');
	const [ symbol, setSymbol ] = useState('n');
	const [ digits, setDigits ] = useState(1);
	const [ order, setOrder ] = useState('a');

	const parentContainer = {
		display: 'grid',
		gridTemplateColumns: 'repeat(2, 1fr)',
		gridTemplateRows: 'repeat(6, 1fr)',
		padding: '3rem'
	};

	const categoryStyle = {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		padding: '1rem',
		textAlign: 'center',
		margin: '1.5rem 0rem'
	};

	const getDigitContainerStyle = (symbol) => {
		return {
			opacity: symbol === 'l' ? '0.3' : '1',
			pointerEvents: symbol === 'l' ? 'none' : 'auto'
		};
	};

	const topContainer = {
		...titleStyle,
		...categoryStyle,
		gridArea: '1 / 1 / 2 / 3'
	};

	const nameContainer = {
		...categoryStyle,
		gridArea: '2 / 1 / 4 / 2'
	};

	const symbolContainer = {
		...categoryStyle,
		gridArea: '4 / 1 / 6 / 2'
	};

	const digitsContainer = {
		...categoryStyle,
		...getDigitContainerStyle(symbol),
		gridArea: '2 / 2 / 4 / 3'
	};

	const orderContainer = {
		...categoryStyle,
		gridArea: '4 / 2 / 6 / 3'
	};

	const bottomContainer = {
		gridArea: '6 / 1 / 7 / 3',
		padding: '2rem',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center'
	};

	const subContainer = {
		display: 'grid',
		gridTemplateColumns: 'repeat(2, 1fr)',
		gridTemplateRows: 'repeat(2, 1fr)',
		gridGap: '1rem',
		padding: '1rem'
	};

	const containerItemStyle = {
		padding: '1rem'
	};

	const generateTaskTemplate = () => {
		let template = name.length ? `${name}_` : '';
		template += '${';
		template += `${symbol},`;
		if (symbol === 'n') template += `${digits},`;
		template += `${order}}`;
		return template;
	};

	return (
		<div style={{ ...containerStyle, ...parentContainer }}>
			<div style={topContainer}>Generate Task Template</div>
			<div style={nameContainer}>
				<div style={{ padding: '1.5rem', paddingTop: '0.4rem' }}>Text Name:</div>
				<form style={{ padding: '1rem' }} onChange={(e) => setName(e.target.value)}>
					<input type="text" name="name" value={name} />
					<input disabled type="submit" value="Submit" style={{ display: 'none' }} />
				</form>
			</div>
			<div style={symbolContainer}>
				<div style={containerItemStyle}>Symbol:</div>
				<div style={{ ...subContainer, ...containerItemStyle }}>
					<div style={{ gridArea: '1 / 1 / 2 / 2' }}>Number:</div>
					<Checkbox
						style={{ gridArea: '1 / 2 / 2 / 3' }}
						default={symbol === 'n'}
						onChange={() => setSymbol('n')}
					/>
					<div style={{ gridArea: '2 / 1 / 3 / 2' }}>Letter:</div>
					<Checkbox
						style={{ gridArea: '2 / 2 / 3 / 3' }}
						default={symbol === 'l'}
						onChange={() => setSymbol('l')}
					/>
				</div>
			</div>
			<div style={digitsContainer}>
				<div style={{ ...containerItemStyle, paddingTop: '0.3rem' }}>{`Digits:`}</div>
				<Dropdown
					className="dropdown"
					default={digits}
					style={{
						alignItems: 'center',
						zIndex: '9',
						width: '2rem',
						padding: '2rem'
					}}
					options={[ ...Array(11).keys() ].slice(1)}
					onClick={(val) => setDigits(val)}
				/>
			</div>
			<div style={orderContainer}>
				<div style={containerItemStyle}>Order:</div>
				<div style={{ ...subContainer, ...containerItemStyle }}>
					<div style={{ gridArea: '1 / 1 / 2 / 2' }}>Ascending:</div>
					<Checkbox
						style={{ gridArea: '1 / 2 / 2 / 3' }}
						default={order === 'a'}
						onChange={() => setOrder('a')}
					/>
					<div style={{ gridArea: '2 / 1 / 3 / 2' }}>Descending:</div>
					<Checkbox
						style={{ gridArea: '2 / 2 / 3 / 3' }}
						default={order === 'd'}
						onChange={() => setOrder('d')}
					/>
				</div>
			</div>
			<div style={bottomContainer}>
				<ColorButton
					color={colorTheme}
					text={'Generate Template'}
					onClick={() => {
						const dateTemplate = generateTaskTemplate();
						setTemplate({ ...template, task: dateTemplate });
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

export default TaskTemplateWizard;
