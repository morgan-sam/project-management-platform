import React from 'react';
import Cell from './Cell';

const Task = (props) => {
	return (
		<div className="taskEntry">
			<Cell text={props.task} />
			<Cell text={parseISOToDDMMYYYY(props.date)} />
			<Cell text={parseISOToDDMMYYYY(props.deadline)} />
			<Cell text={props.urgency} />
			<Cell text={props.team} />
			<Cell text={props.completed} />
		</div>
	);
};

const parseISOToDDMMYYYY = (string) => {
	const stringDate = string.match(/.+?(?=T)/g)[0];
	return stringDate.split('-').reverse().join('/');
};

export default Task;
