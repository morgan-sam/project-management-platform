import React from 'react';
import Cell from './Cell';

import { parseISOToLittleEndian } from '../processing/parseDates';

const Task = (props) => {
	return (
		<div className="taskEntry">
			<Cell text={props.task} />
			<Cell text={parseISOToLittleEndian(props.date)} />
			<Cell text={parseISOToLittleEndian(props.deadline)} />
			<Cell text={props.urgency} />
			<Cell text={props.team} />
			<Cell text={props.completed} />
		</div>
	);
};

export default Task;
