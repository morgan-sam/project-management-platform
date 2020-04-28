import React from 'react';
import DataCell from 'components/DataCell';
import { parseISOToLittleEndian } from 'processing/parseDates';

const Task = (props) => {
	return (
		<tr className="taskEntry">
			<DataCell className="taskCell" text={props.item.task} />
			<DataCell className="dateCell" text={parseISOToLittleEndian(props.item.date)} />
			<DataCell className="deadlineCell" text={parseISOToLittleEndian(props.item.deadline)} />
			<DataCell className="urgencyCell" text={props.item.urgency} />
			<DataCell className="teamCell" text={props.item.team} />
			<DataCell
				className="completedCell"
				text={props.item.completed}
				onClick={() => props.setEntryCompletion(props.item, !props.item.completed)}
			/>
			<DataCell
				className="selectedCell"
				text={props.selected ? 'X' : ''}
				onClick={() => props.setSelect(props.item.id)}
			/>
		</tr>
	);
};

export default Task;
