import React, { useState } from 'react';
import DropdownWithLabel from 'components/DropdownWithLabel';
import InputFormWithLabel from 'components/InputFormWithLabel';
import DateTemplateWizard from 'components/DateTemplateWizard';
import WizardButton from 'components/WizardButton';
import ColorButton from 'components/ColorButton';
import {
	containerStyle,
	subContainerStyle,
	cancelButtonStyle,
	errorTextStyle,
	topRowStyle
} from 'styling/batchNewTasks';
import { interpretTaskTemplate, interpretDateTemplate } from 'processing/batchNewTasks';
import { fetchPostEntry } from 'data/fetch';
import { parseDateObjToISO } from 'processing/parseDates';

const BatchNewTasks = (props) => {
	const { setDataChanged, setPopUp, colorTheme } = props;
	const [ errors, setErrors ] = useState({ task: '', date: '', deadline: '' });
	const [ template, setTemplate ] = useState({
		count: 10,
		task: 'Task_${n}',
		date: '${t}',
		deadline: '${t}+2w',
		urgency: 3,
		team: 'PLACEHOLDER_NAME'
	});

	const addMultipleTasks = () => {
		let errors = {};
		const tasks = interpretTaskTemplate(template.task, template.count);
		const dates = interpretDateTemplate(template.date, template.count);
		const deadlines = interpretDateTemplate(template.date, template.count);
		if (typeof tasks === 'string') errors['task'] = tasks;
		if (typeof dates === 'string') errors['date'] = dates;
		if (typeof deadlines === 'string') errors['deadline'] = deadlines;
		if (Object.values(errors).length === 0) {
			for (let i = 0; i < template.count; i++) {
				const entry = {
					task: tasks[i],
					date: parseDateObjToISO(dates[i]),
					deadline: parseDateObjToISO(deadlines[i]),
					urgency: template.urgency,
					team: template.team,
					completed: false
				};
				fetchPostEntry(entry);
				setDataChanged(true);
				setPopUp(null);
			}
		} else {
			setErrors(errors);
		}
	};

	return (
		<div style={containerStyle}>
			<div style={subContainerStyle}>
				<InputFormWithLabel
					{...props}
					label={'Number Of Tasks'}
					onChange={(val) => setTemplate({ ...template, count: parseInt(val) })}
					default={template.count ? template.count : 0}
				/>
			</div>
			<div style={subContainerStyle}>
				<div style={topRowStyle}>
					<InputFormWithLabel
						{...props}
						label={'Task Template'}
						onChange={(val) => {
							setTemplate({ ...template, task: val });
							setErrors({ ...errors, task: null });
						}}
						default={template.task}
					/>
					<WizardButton color={colorTheme} onClick={() => null} />
				</div>
				<div style={errorTextStyle}>{errors.task}</div>
			</div>
			<div style={subContainerStyle}>
				<div style={topRowStyle}>
					<InputFormWithLabel
						{...props}
						label={'Date Template'}
						onChange={(val) => {
							let filtered = val.replace(/[^a-zA-Z0-9\{\}\$\+\-\(\)\/]/g, '');
							setTemplate({ ...template, date: filtered });
							setErrors({ ...errors, date: null });
						}}
						default={template.date}
					/>
					<WizardButton color={colorTheme} onClick={() => null} />
				</div>
				<div style={errorTextStyle}>{errors.date}</div>
			</div>
			<div style={subContainerStyle}>
				<div style={topRowStyle}>
					<InputFormWithLabel
						{...props}
						label={'Deadline Template'}
						onChange={(val) => {
							let filtered = val.replace(/[^a-zA-Z0-9\{\}\$\+\-\(\)\/]/g, '');
							setTemplate({ ...template, deadline: filtered });
							setErrors({ ...errors, deadline: null });
						}}
						default={template.deadline}
					/>
					<WizardButton color={colorTheme} />
				</div>
				<div style={errorTextStyle}>{errors.deadline}</div>
			</div>
			<div style={{ zIndex: '10' }}>
				<DropdownWithLabel
					{...props}
					label={'Urgency'}
					options={[ 1, 2, 3, 4, 5 ]}
					default={template.urgency}
					onClick={(val) => setTemplate({ ...template, urgency: val })}
					width={'2rem'}
				/>
			</div>
			<div style={subContainerStyle}>
				<InputFormWithLabel
					{...props}
					label={'Team'}
					onChange={(val) => setTemplate({ ...template, team: val })}
					default={template.team}
				/>
			</div>
			<div style={subContainerStyle}>
				<ColorButton color={colorTheme} text={'Add Tasks'} onClick={() => addMultipleTasks()} />
			</div>
			<button style={cancelButtonStyle} onClick={() => setPopUp(null)}>
				×
			</button>
		</div>
	);
};

export default BatchNewTasks;

// Task Template Options:

// '${n, 1/2/3/#, a/d}
// 'Number template:
// 'mainflag, Minimum digits, ascending/descending'

// '${l, a/d}
// 'Letter template:
// 'mainflag, ascending/descending'

// Examples:
// BackendTest_${n} => (BackendTest_1,BackendTest_2,BackendTest_3)
// FrontendTest_${n-1,3} => (FrontendTest_000,FrontendTest_001,FrontendTest_002)
// feature_${l,d} => (feature_z,feature_y,feature_x)

///////////////////////////////////////////////////////////////////////////////////////////////
