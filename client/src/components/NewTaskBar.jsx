import React, { useState } from 'react';
import { newTaskBarStyle } from 'styling/newTaskBar';
import TaskNameInput from './TaskNameInput';
import DateRangeSelect from 'components/DateRangeSelect';
import { parseISOToDateObj } from 'processing/parseDates';

const NewTaskBar = (props) => {
	const [ overflowHidden, setOverflowHidden ] = useState(true);

	const taskBarHidden = {
		opacity: '0',
		maxHeight: '0',
		zIndex: '-10',
		//executes on close
		transition: 'max-height 0.7s cubic-bezier(0,.53,.23,.83), opacity 1s cubic-bezier(0,1.06,.62,.99)'
	};

	const taskBarVisible = {
		maxHeight: '11rem',
		opacity: '1',
		//executes on open
		transition: 'max-height 10.5s cubic-bezier(0,1.46,.83,.67), opacity 1s'
	};

	const [ date, setDate ] = useState('2013-03-10T02:00:00Z');
	const [ deadline, setDeadline ] = useState('2013-03-10T02:00:00Z');

	return (
		<div
			classname="newTaskBar"
			style={{
				...props.style,
				...newTaskBarStyle,
				...(props.displayNewTaskBar ? taskBarHidden : taskBarVisible),
				overflow: overflowHidden ? 'visible' : 'hidden'
			}}
		>
			<TaskNameInput {...props} />
			<DateRangeSelect
				{...props}
				date={parseISOToDateObj(date)}
				deadline={parseISOToDateObj(deadline)}
				setDate={(val) => setDate(val)}
				setDeadline={(val) => setDeadline(val)}
				setOverflowHidden={setOverflowHidden}
			/>
		</div>
	);
};

export default NewTaskBar;
