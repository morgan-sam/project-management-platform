import React from 'react';
import Cell from './Cell';

const Task = (props) => {
	return (
		<div className="taskEntry">
			<Cell text={props.task} />
			<Cell text={new Date(props.date).toString()} />
			<Cell text={new Date(props.deadline).toString()} />
			<Cell text={props.urgency} />
			<Cell text={props.team} />
			<Cell text={props.completed} />
		</div>
	);
};

export default Task;
