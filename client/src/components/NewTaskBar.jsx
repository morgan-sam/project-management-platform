import React, { useState } from 'react';
import ColorButton from 'components/ColorButton';
import DateRangeSelect from 'components/DateRangeSelect';
import DropdownWithLabel from 'components/DropdownWithLabel';
import InputFormWithLabel from 'components/InputFormWithLabel';
import { newTaskBarStyle, getTaskBarHiddenStyle, getTaskBarVisibleStyle, addTaskBtn } from 'styling/newTaskBar';
import { parseISOToDateObj } from 'processing/parseDates';
import { fetchPostEntry } from 'data/fetch';
import { getDayFromTodayAsISO } from 'data/dates';

const NewTaskBar = (props) => {
	const { style, displayNewTaskBar, setDataChanged, setDisplayNewTaskBar } = props;

	const [ overflowHidden, setOverflowHidden ] = useState(true);
	const [ popUpOpen, setPopUpOpen ] = useState(false);

	const [ task, setTask ] = useState(null);
	const [ date, setDate ] = useState(getDayFromTodayAsISO(0));
	const [ deadline, setDeadline ] = useState(getDayFromTodayAsISO(14));
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
				className="newTaskBar"
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
				<ColorButton
					text={`Add Task To Database`}
					onClick={() => addTaskToDatabase()}
					color={'rgb(35, 104, 184)'}
				/>
			</div>
		</div>
	);
};

export default NewTaskBar;
