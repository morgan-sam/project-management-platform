import React from 'react';
import DataCell from 'components/DataCell';
import { parseISOToLittleEndian } from 'processing/parseDates';
import { cellStyle } from 'styling/table';

const Task = (props) => {
	return (
		<tr className="taskEntry">
			<DataCell className="taskCell" text={props.item.task} style={cellStyle} />
			<DataCell className="dateCell" text={parseISOToLittleEndian(props.item.date)} style={cellStyle} />
			<DataCell className="deadlineCell" text={parseISOToLittleEndian(props.item.deadline)} style={cellStyle} />
			<DataCell className="urgencyCell" text={props.item.urgency} style={cellStyle} />
			<DataCell className="teamCell" text={props.item.team} style={cellStyle} />
			<DataCell
				className="completedCell"
				text={props.item.completed}
				onClick={() => props.setEntryCompletion(props.item, !props.item.completed)}
				style={cellStyle}
			/>
			<DataCell
				className="selectedCell"
				text={props.selected ? 'X' : ''}
				onClick={() => props.setSelect(props.item.id)}
				style={cellStyle}
			/>
		</tr>
	);
};

export default Task;
