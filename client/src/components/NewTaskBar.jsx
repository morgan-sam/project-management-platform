import React, { useState } from 'react';
import { newTaskBarStyle, getTaskBarHiddenStyle, getTaskBarVisibleStyle } from 'styling/newTaskBar';
import TaskNameInput from './TaskNameInput';
import DateRangeSelect from 'components/DateRangeSelect';
import { parseISOToDateObj } from 'processing/parseDates';
import DropdownWithLabel from 'components/DropdownWithLabel';

const NewTaskBar = (props) => {
	const [ overflowHidden, setOverflowHidden ] = useState(true);
	const [ popUpOpen, setPopUpOpen ] = useState(false);

	const [ date, setDate ] = useState('2013-03-10T02:00:00Z');
	const [ deadline, setDeadline ] = useState('2013-03-10T02:00:00Z');
	const [ urgency, setUrgency ] = useState(3);

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
				<TaskNameInput {...props} />
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
			</div>
		</div>
	);
};

export default NewTaskBar;
