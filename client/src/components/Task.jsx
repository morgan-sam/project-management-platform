import React from 'react';
import DataCell from 'components/DataCell';
import { parseISOToLittleEndian } from 'processing/parseDates';
import { taskCell, dateCell, deadlineCell, urgencyCell, teamCell, completedCell, selectedCell } from 'styling/dataCell';

const Task = (props) => {
	return (
		<tr className="taskEntry">
			<DataCell
				className="taskCell"
				text={props.item.task}
				style={taskCell}
				onClick={() => props.setSelect(props.item.id)}
			/>
			<DataCell className="dateCell" text={parseISOToLittleEndian(props.item.date)} style={dateCell} />
			<DataCell
				className="deadlineCell"
				text={parseISOToLittleEndian(props.item.deadline)}
				style={deadlineCell}
			/>
			<DataCell className="urgencyCell" text={props.item.urgency} style={urgencyCell} />
			<DataCell className="teamCell" text={props.item.team} style={teamCell} />
			<DataCell
				className="completedCell"
				text={props.item.completed}
				onClick={() => props.setEntryCompletion(props.item, !props.item.completed)}
				style={completedCell}
			/>
			<DataCell
				className="selectedCell"
				text={props.selected ? 'X' : ''}
				onClick={() => props.setSelect(props.item.id)}
				style={selectedCell}
			/>
		</tr>
	);
};

export default Task;
