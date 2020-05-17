import React, { useState } from 'react';
import InputFormWithLabel from 'components/InputFormWithLabel';
import { cancelButtonStyle, containerStyle } from 'styling/batchNewTasks';

const TaskTemplateWizard = (props) => {
	const { setScreen, colorTheme, setTemplate, template } = props;
	const [ name, setName ] = useState('');

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

	return (
		<div style={{ ...containerStyle, ...parentContainer }}>
			<div style={nameContainer}>
				<InputFormWithLabel {...props} label={'Task Name'} onChange={(val) => setName(val)} default={name} />
			</div>
			<div style={symbolContainer}>{'Symbol'}</div>
			<div style={digitsContainer}>{'Digits'}</div>
			<div style={orderContainer}>{'Order'}</div>
			<div style={bottomContainer}>{'Bottom'}</div>
			<button style={cancelButtonStyle} onClick={() => setScreen('main')}>
				×
			</button>
		</div>
	);
};

export default TaskTemplateWizard;
