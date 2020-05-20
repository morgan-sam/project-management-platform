import React, { useState } from 'react';
import ColorButton from 'components/ColorButton';
import DateRangeSelect from 'components/DateRangeSelect';
import DropdownWithLabel from 'components/DropdownWithLabel';
import InputFormWithLabel from 'components/InputFormWithLabel';
import { newTaskBarStyle } from 'styling/newTaskBar';
import { getTaskBarHiddenStyle, getTaskBarVisibleStyle } from 'styling/taskBars';
import { parseISOToDateObj } from 'processing/parseDates';
import { fetchPostEntry } from 'data/fetch';
import { getDayFromTodayAsISO } from 'data/dates';

const NewTaskBar = (props) => {
	const { style, displayedBars, setDataChanged, setDisplayedBars } = props;
	const [ overflowHidden, setOverflowHidden ] = useState(true);
	const [ popUpOpen, setPopUpOpen ] = useState(false);
	const [ taskString, setTaskString ] = useState(null);
	const [ date, setDate ] = useState(getDayFromTodayAsISO(0));
	const [ deadline, setDeadline ] = useState(getDayFromTodayAsISO(14));
	const [ urgency, setUrgency ] = useState(3);
	const [ teamsString, setTeamsStrings ] = useState(null);

	const teams = teamsString ? teamsString.split(' ').filter((el) => el !== '') : [];
	const task = taskString ? taskString.trim() : '';

	const addTaskToDatabase = () => {
		if (task && teams.length) {
			const entry = { task, date, deadline, urgency, teams, completed: 'false' };
			fetchPostEntry(entry);
			setDataChanged(true);
			setTimeout(() => setDisplayedBars({ ...displayedBars, newTask: false }), 500);
		}
	};

	return (
		<div>
			<div
				className="newTaskBar"
				style={{
					...style,
					...newTaskBarStyle,
					...(displayedBars.newTask ? getTaskBarVisibleStyle(popUpOpen) : getTaskBarHiddenStyle(popUpOpen)),
					overflow: overflowHidden ? 'visible' : 'hidden'
				}}
			>
				<InputFormWithLabel {...props} label={'Task'} onChange={setTaskString} />
				<DateRangeSelect
					{...props}
					date={parseISOToDateObj(date)}
					deadline={parseISOToDateObj(deadline)}
					setDate={setDate}
					setDeadline={setDeadline}
					setOverflowHidden={setOverflowHidden}
					setPopUpOpen={setPopUpOpen}
				/>
				<DropdownWithLabel
					{...props}
					width={'2rem'}
					label={'Urgency'}
					selected={urgency}
					options={[ 1, 2, 3, 4, 5 ]}
					onClick={setUrgency}
					setOverflowHidden={setOverflowHidden}
				/>
				<InputFormWithLabel {...props} label={'Teams'} onChange={(val) => setTeamsStrings(val)} />
				<ColorButton text={`Add Task To Database`} onClick={addTaskToDatabase} enabled={task && teams.length} />
			</div>
		</div>
	);
};

export default NewTaskBar;
