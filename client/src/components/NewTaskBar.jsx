import React, { useState } from 'react';
import { newTaskBarStyle, getTaskBarHiddenStyle, getTaskBarVisibleStyle, addTaskBtn } from 'styling/newTaskBar';
import InputFormWithLabel from './InputFormWithLabel';
import DateRangeSelect from 'components/DateRangeSelect';
import { parseISOToDateObj } from 'processing/parseDates';
import DropdownWithLabel from 'components/DropdownWithLabel';
import { fetchPostEntry } from 'data/fetch';

const NewTaskBar = (props) => {
	const { style, displayNewTaskBar, setDataChanged, setDisplayNewTaskBar } = props;

	const [ overflowHidden, setOverflowHidden ] = useState(true);
	const [ popUpOpen, setPopUpOpen ] = useState(false);

	const [ task, setTask ] = useState(null);
	const [ date, setDate ] = useState('2013-03-10T02:00:00Z');
	const [ deadline, setDeadline ] = useState('2013-03-10T02:00:00Z');
	const [ urgency, setUrgency ] = useState(3);
	const [ team, setTeam ] = useState(null);

	const addTaskToDatabase = () => {
		const entry = { task, date, deadline, urgency, team, completed: 'false' };
		setDisplayNewTaskBar(false);
		fetchPostEntry(entry);
		setDataChanged(true);
	};

	return (
		<div>
			<div
				classname="newTaskBar"
				style={{
					...style,
					...newTaskBarStyle,
					...(displayNewTaskBar ? getTaskBarVisibleStyle(popUpOpen) : getTaskBarHiddenStyle(popUpOpen)),
					overflow: overflowHidden ? 'visible' : 'hidden'
				}}
			>
				<InputFormWithLabel {...props} label={'Task'} onChange={(val) => setTask(val)} />
				<DateRangeSelect
					{...props}
					date={parseISOToDateObj(date)}
					deadline={parseISOToDateObj(deadline)}
					setDate={(val) => setDate(val)}
					setDeadline={(val) => setDeadline(val)}
					setOverflowHidden={setOverflowHidden}
					setPopUpOpen={setPopUpOpen}
				/>
				<DropdownWithLabel
					{...props}
					width={'2rem'}
					label={'Urgency'}
					default={urgency}
					options={[ 1, 2, 3, 4, 5 ]}
					onClick={(val) => setUrgency(val)}
					setOverflowHidden={setOverflowHidden}
				/>
				<InputFormWithLabel {...props} label={'Team'} onChange={(val) => setTeam(val)} />
				<button onClick={() => addTaskToDatabase()} style={addTaskBtn}>
					Add Task To Database
				</button>
			</div>
		</div>
	);
};

export default NewTaskBar;
