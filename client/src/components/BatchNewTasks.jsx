import React, { useState } from 'react';
import MainBatchScreen from 'components/MainBatchScreen';
import DateTemplateWizard from 'components/DateTemplateWizard';
import TaskTemplateWizard from 'components/TaskTemplateWizard';
import { interpretDateTemplate } from 'processing/batchNewTasks';
import { interpretTaskTemplate } from 'processing/interpretTaskTemplate';
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
		teams: [ 'Team1', 'Team2', 'Team3' ]
	});
	const [ screen, setScreen ] = useState('main');

	const getTaskEntry = (strings, i) => {
		const { task, date, deadline } = strings;
		return {
			task: task[i],
			date: parseDateObjToISO(date[i]),
			deadline: parseDateObjToISO(deadline[i]),
			urgency: template.urgency,
			teams: template.teams.filter((el) => el !== ''),
			completed: false
		};
	};

	const checkForTemplateErrors = (strings) => {
		let errors = {};
		const { task, date, deadline } = strings;
		if (typeof task === 'string') errors['task'] = task;
		if (typeof date === 'string') errors['date'] = date;
		if (typeof deadline === 'string') errors['deadline'] = deadline;
		return errors;
	};

	const getEntryStrings = () => {
		return {
			task: interpretTaskTemplate(template.task, template.count),
			date: interpretDateTemplate(template.date, template.count),
			deadline: interpretDateTemplate(template.deadline, template.count)
		};
	};

	const addMultipleTasks = () => {
		let strings = getEntryStrings();
		let errors = checkForTemplateErrors(strings);
		if (Object.values(errors).length === 0) {
			for (let i = 0; i < template.count; i++) {
				const entry = getTaskEntry(strings, i);
				fetchPostEntry(entry);
				setDataChanged(true);
				setPopUp(null);
			}
		} else {
			setErrors(errors);
		}
	};

	return (
		<div>
			{screen === 'main' && (
				<MainBatchScreen
					errors={errors}
					setErrors={setErrors}
					template={template}
					setTemplate={setTemplate}
					colorTheme={colorTheme}
					addMultipleTasks={addMultipleTasks}
					setPopUp={setPopUp}
					setScreen={setScreen}
				/>
			)}
			{(screen === 'dateWizard' || screen === 'deadlineWizard') && (
				<DateTemplateWizard
					setScreen={setScreen}
					colorTheme={colorTheme}
					template={template}
					setTemplate={setTemplate}
					screen={screen}
				/>
			)}
			{screen === 'taskWizard' && (
				<TaskTemplateWizard
					setScreen={setScreen}
					colorTheme={colorTheme}
					template={template}
					setTemplate={setTemplate}
				/>
			)}
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
