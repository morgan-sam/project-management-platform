import React from 'react';
import Cell from './Cell';

import { parseISOToLittleEndian } from '../processing/parseDates';

const Task = (props) => {
	return (
		<div className="taskEntry">
			<Cell className="taskCell" text={props.task} />
			<Cell className="dateCell" text={parseISOToLittleEndian(props.date)} />
			<Cell className="deadlineCell" text={parseISOToLittleEndian(props.deadline)} />
			<Cell className="urgencyCell" text={props.urgency} />
			<Cell className="teamCell" text={props.team} />
			<Cell className="completedCell" text={props.completed} />
			<Cell className="selectedCell" text={props.selected ? 'X' : ''} onClick={() => props.setSelect(props.id)} />
		</div>
	);
};

export default Task;
