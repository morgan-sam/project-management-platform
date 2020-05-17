import React, { useState } from 'react';
import DropdownWithLabel from 'components/DropdownWithLabel';
import InputFormWithLabel from 'components/InputFormWithLabel';
import WizardButton from 'components/WizardButton';
import ColorButton from 'components/ColorButton';
import { containerStyle, subContainerStyle, cancelButtonStyle } from 'styling/batchNewTasks';
import { interpretTaskTemplate, interpretDateTemplate } from 'processing/batchNewTasks';
import { fetchPostEntry } from 'data/fetch';
import { parseDateObjToISO } from 'processing/parseDates';

const BatchNewTasks = (props) => {
	const { setDataChanged, setPopUp, colorTheme } = props;

	const [ taskCount, setTaskCount ] = useState(10);
	const [ taskTemplate, setTaskTemplate ] = useState('Task_${n}');
	const [ dateTemplate, setDateTemplate ] = useState('${t}');
	const [ deadlineTemplate, setDeadlineTemplate ] = useState('${t}+2w');
	const [ urgency, setUrgency ] = useState(3);
	const [ team, setTeam ] = useState('PLACEHOLDER_NAME');
	const [ errors, setErrors ] = useState({ task: null, date: null, deadline: null });

	const addMultipleTasks = () => {
		let errors = {};
		const tasks = interpretTaskTemplate(taskTemplate, taskCount);
		const dates = interpretDateTemplate(dateTemplate, taskCount);
		const deadlines = interpretDateTemplate(deadlineTemplate, taskCount);
		if (typeof tasks === 'string') errors['task'] = tasks;
		if (typeof dates === 'string') errors['date'] = dates;
		if (typeof deadlines === 'string') errors['deadline'] = deadlines;
		if (Object.values(errors).length === 0) {
			for (let i = 0; i < taskCount; i++) {
				const entry = {
					task: tasks[i],
					date: parseDateObjToISO(dates[i]),
					deadline: parseDateObjToISO(deadlines[i]),
					urgency,
					team,
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
					onChange={(val) => setTaskCount(parseInt(val))}
					default={taskCount ? taskCount : 0}
				/>
			</div>
			<div style={subContainerStyle}>
				<InputFormWithLabel
					{...props}
					label={'Task Template'}
					onChange={(val) => {
						setTaskTemplate(val);
						setErrors({ ...errors, task: null });
					}}
					default={taskTemplate}
				/>
				<WizardButton color={colorTheme} />
				{errors.task}
			</div>
			<div style={subContainerStyle}>
				<InputFormWithLabel
					{...props}
					label={'Date Template'}
					onChange={(val) => {
						let filtered = val.replace(/[^a-zA-Z0-9\{\}\$\+\-\(\)\/]/g, '');
						setDateTemplate(filtered);
						setErrors({ ...errors, date: null });
					}}
					default={dateTemplate}
				/>
				<WizardButton color={colorTheme} />
				{errors.date}
			</div>
			<div style={subContainerStyle}>
				<InputFormWithLabel
					{...props}
					label={'Deadline Template'}
					onChange={(val) => {
						let filtered = val.replace(/[^a-zA-Z0-9\{\}\$\+\-\(\)\/]/g, '');
						setDeadlineTemplate(filtered);
						setErrors({ ...errors, deadline: null });
					}}
					default={deadlineTemplate}
				/>
				<WizardButton color={colorTheme} />
				{errors.deadline}
			</div>
			<div style={subContainerStyle}>
				<DropdownWithLabel
					{...props}
					label={'Urgency'}
					options={[ 1, 2, 3, 4, 5 ]}
					default={urgency}
					onClick={(val) => setUrgency(val)}
					width={'2rem'}
				/>
				<InputFormWithLabel {...props} label={'Team'} onChange={(val) => setTeam(val)} default={team} />
			</div>
			<ColorButton color={colorTheme} text={'Add Tasks'} onClick={() => addMultipleTasks()} />
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
