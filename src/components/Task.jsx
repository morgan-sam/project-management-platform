import React from 'react';
import Cell from './Cell';

import { parseISOToDDMMYYYY } from '../processing/parseDates';

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

export default Task;
