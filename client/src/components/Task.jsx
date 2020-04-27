import React from 'react';
import Cell from './Cell';

import { parseISOToLittleEndian } from '../processing/parseDates';

const Task = (props) => {
	return (
		<div className="taskEntry">
			<Cell className="tableCell taskCell" text={props.task} />
			<Cell className="tableCell dateCell" text={parseISOToLittleEndian(props.date)} />
			<Cell className="tableCell deadlineCell" text={parseISOToLittleEndian(props.deadline)} />
			<Cell className="tableCell urgencyCell" text={props.urgency} />
			<Cell className="tableCell teamCell" text={props.team} />
			<Cell className="tableCell completedCell" text={props.completed} />
			<Cell
				className="tableCell selectedCell"
				text={props.selected ? 'X' : ''}
				onClick={() => props.setSelect(props.id)}
			/>
		</div>
	);
};

export default Task;
