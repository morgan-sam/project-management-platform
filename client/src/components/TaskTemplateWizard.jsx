import React, { useState } from 'react';
import InputFormWithLabel from 'components/InputFormWithLabel';
import Checkbox from 'components/Checkbox';
import { cancelButtonStyle, containerStyle } from 'styling/batchNewTasks';

const TaskTemplateWizard = (props) => {
	const { setScreen, colorTheme, setTemplate, template } = props;
	const [ name, setName ] = useState('');
	const [ symbol, setSymbol ] = useState('n');
	const [ order, setOrder ] = useState('a');

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

	const nameContainer = {
		...categoryStyle,
		gridArea: '1 / 1 / 4 / 2'
	};

	const symbolContainer = {
		...categoryStyle,
		gridArea: '4 / 1 / 7 / 2'
	};

	const digitsContainer = {
		...categoryStyle,
		gridArea: '1 / 2 / 4 / 3'
	};

	const orderContainer = {
		...categoryStyle,
		gridArea: '4 / 2 / 7 / 3'
	};

	const bottomContainer = {
		gridArea: '7 / 1 / 9 / 3',
		padding: '2rem',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center'
	};

	const symbolSubContainer = {
		display: 'grid',
		gridTemplateColumns: 'repeat(2, 1fr)',
		gridTemplateRows: 'repeat(2, 1fr)',
		gridGap: '1rem',
		padding: '1rem'
	};

	const containerItemStyle = {
		padding: '1rem'
	};

	return (
		<div style={{ ...containerStyle, ...parentContainer }}>
			<div style={nameContainer}>
				<InputFormWithLabel
					{...props}
					label={'Task Name'}
					onChange={(val) => setName(val)}
					default={name}
					style={containerItemStyle}
				/>
			</div>
			<div style={symbolContainer}>
				<div style={containerItemStyle}>Symbol:</div>
				<div style={{ ...symbolSubContainer, ...containerItemStyle }}>
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
			<div style={digitsContainer}>{'Digits'}</div>
			<div style={orderContainer}>
				<div style={containerItemStyle}>Order:</div>
				<div style={{ ...symbolSubContainer, ...containerItemStyle }}>
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
			<div style={bottomContainer}>{'Bottom'}</div>
			<button style={cancelButtonStyle} onClick={() => setScreen('main')}>
				×
			</button>
		</div>
	);
};

export default TaskTemplateWizard;
