import React from 'react';
import Cell from './Cell';

const Task = (props) => {
	return (
		<div className="taskEntry">
			<Cell text={props.task} />
			<Cell text={props.date} />
			<Cell text={props.deadline} />
			<Cell text={props.urgency} />
			<Cell text={props.team} />
		</div>
	);
};

export default Task;
