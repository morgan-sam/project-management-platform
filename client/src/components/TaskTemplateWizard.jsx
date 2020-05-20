import React, { useState } from 'react';
import Checkbox from 'components/Checkbox';
import Dropdown from 'components/Dropdown';
import ColorButton from 'components/ColorButton';
import { cancelButtonStyle, containerStyle } from 'styling/batchNewTasks';
import {
	mainGridContainer,
	getSectionOpacityStyle,
	topContainer,
	topLeftContainer,
	bottomLeftContainer,
	topRightContainer,
	bottomRightContainer,
	bottomContainer,
	containerItemStyle,
	getSubGridStyle
} from 'styling/wizardStyles';

const TaskTemplateWizard = (props) => {
	const { setScreen, setTemplate, template } = props;
	const [ name, setName ] = useState('');
	const [ symbol, setSymbol ] = useState('n');
	const [ digits, setDigits ] = useState(1);
	const [ order, setOrder ] = useState('a');

	const generateTaskTemplate = () => {
		let template = name.length ? `${name}_` : '';
		template += '${';
		template += `${symbol},`;
		if (symbol === 'n') template += `${digits},`;
		template += `${order}}`;
		return template;
	};

	return (
		<div style={containerStyle}>
			<div style={topContainer}>Generate Task Template</div>
			<div style={mainGridContainer}>
				<div style={topLeftContainer}>
					<div style={{ padding: '1.5rem', paddingTop: '0.4rem' }}>Text Name:</div>
					<form style={{ padding: '1rem' }} onChange={(e) => setName(e.target.value)}>
						<input type="text" name="name" defaultValue={name} />
						<input disabled type="submit" value="Submit" style={{ display: 'none' }} />
					</form>
				</div>
				<div style={bottomLeftContainer}>
					<div style={containerItemStyle}>Symbol:</div>
					<div style={{ ...getSubGridStyle(2, 2), ...containerItemStyle }}>
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
				<div
					style={{
						...topRightContainer,
						...getSectionOpacityStyle(symbol === 'l')
					}}
				>
					<div style={{ ...containerItemStyle, paddingTop: '0.3rem' }}>{`Digits:`}</div>
					<Dropdown
						className="dropdown"
						selected={digits}
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
				<div style={bottomRightContainer}>
					<div style={containerItemStyle}>Order:</div>
					<div style={{ ...getSubGridStyle(2, 2), ...containerItemStyle }}>
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
			</div>
			<div style={bottomContainer}>
				<ColorButton
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
