import React from 'react';
import HeadingCell from 'components/HeadingCell';
import { cellStyle } from 'styling/table';

const TableHeadings = (props) => {
	const sortArrow = props.sortOptions.reversed ? '↓' : '↑';

	return (
		<tr className="tableHeadings" style={{ cursor: 'pointer', userSelect: 'none' }}>
			<HeadingCell
				className="taskCell"
				text={`Task ${props.sortOptions.type === 'task' ? sortArrow : ''}`}
				onClick={() => props.userSetSort('task')}
				style={cellStyle}
			/>
			<HeadingCell
				className="dateCell"
				text={`Date ${props.sortOptions.type === 'date' ? sortArrow : ''}`}
				onClick={() => props.userSetSort('date')}
				style={cellStyle}
			/>
			<HeadingCell
				className="deadlineCell"
				text={`Deadline ${props.sortOptions.type === 'deadline' ? sortArrow : ''}`}
				onClick={() => props.userSetSort('deadline')}
				style={cellStyle}
			/>
			<HeadingCell
				className="urgencyCell"
				text={`Urgency ${props.sortOptions.type === 'urgency' ? sortArrow : ''}`}
				onClick={() => props.userSetSort('urgency')}
				style={cellStyle}
			/>
			<HeadingCell
				className="teamCell"
				text={`Team ${props.sortOptions.type === 'team' ? sortArrow : ''}`}
				onClick={() => props.userSetSort('team')}
				style={cellStyle}
			/>
			<HeadingCell
				className="completedCell"
				text={`Completed ${props.sortOptions.type === 'completed' ? sortArrow : ''}`}
				onClick={() => props.userSetSort('completed')}
				style={cellStyle}
			/>
			<HeadingCell className="selectedCell" text={`X`} style={cellStyle} />
		</tr>
	);
};

export default TableHeadings;
