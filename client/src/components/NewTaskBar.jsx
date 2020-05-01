import React, { useState } from 'react';
import { newTaskBarStyle, getTaskBarHiddenStyle, getTaskBarVisibleStyle } from 'styling/newTaskBar';
import InputFormWithLabel from './InputFormWithLabel';
import DateRangeSelect from 'components/DateRangeSelect';
import { parseISOToDateObj } from 'processing/parseDates';
import DropdownWithLabel from 'components/DropdownWithLabel';

const NewTaskBar = (props) => {
	const [ overflowHidden, setOverflowHidden ] = useState(true);
	const [ popUpOpen, setPopUpOpen ] = useState(false);

	const [ task, setTask ] = useState(null);
	const [ date, setDate ] = useState('2013-03-10T02:00:00Z');
	const [ deadline, setDeadline ] = useState('2013-03-10T02:00:00Z');
	const [ urgency, setUrgency ] = useState(3);
	const [ teams, setTeams ] = useState(null);

	console.log(task, date, deadline, urgency, teams);

	return (
		<div>
			<div
				classname="newTaskBar"
				style={{
					...props.style,
					...newTaskBarStyle,
					...(props.displayNewTaskBar ? getTaskBarHiddenStyle(popUpOpen) : getTaskBarVisibleStyle(popUpOpen)),
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
				/>
				<InputFormWithLabel {...props} label={'Teams'} onChange={(val) => setTeams(val)} />
			</div>
		</div>
	);
};

export default NewTaskBar;
