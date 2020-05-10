import React from 'react';
import HeadingCell from 'components/HeadingCell';
import {
	taskCell,
	dateCell,
	deadlineCell,
	urgencyCell,
	teamCell,
	completedCell,
	selectionCell
} from 'styling/headingCell';

const TableHeadings = (props) => {
	const sortArrow = props.sortOptions.reversed ? '↓' : '↑';

	return (
		<tr className="tableHeadings" style={{ cursor: 'pointer', userSelect: 'none' }}>
			<HeadingCell
				className="taskCell"
				text={`Task ${props.sortOptions.type === 'task' ? sortArrow : ''}`}
				onClick={() => props.userSetSort('task')}
				style={taskCell}
			/>
			<HeadingCell
				className="dateCell"
				text={`Date ${props.sortOptions.type === 'date' ? sortArrow : ''}`}
				onClick={() => props.userSetSort('date')}
				style={dateCell}
			/>
			<HeadingCell
				className="deadlineCell"
				text={`Deadline ${props.sortOptions.type === 'deadline' ? sortArrow : ''}`}
				onClick={() => props.userSetSort('deadline')}
				style={deadlineCell}
			/>
			<HeadingCell
				className="urgencyCell"
				text={`Urgency ${props.sortOptions.type === 'urgency' ? sortArrow : ''}`}
				onClick={() => props.userSetSort('urgency')}
				style={urgencyCell}
			/>
			<HeadingCell
				className="teamCell"
				text={`Team ${props.sortOptions.type === 'team' ? sortArrow : ''}`}
				onClick={() => props.userSetSort('team')}
				style={teamCell}
			/>
			<HeadingCell
				className="completedCell"
				text={`Completed ${props.sortOptions.type === 'completed' ? sortArrow : ''}`}
				onClick={() => props.userSetSort('completed')}
				style={completedCell}
			/>
			<HeadingCell
				className="selectionCell"
				text={`${props.sortOptions.type === 'selected' ? sortArrow : 'X'}`}
				onClick={() => props.userSetSort('selected')}
				style={selectionCell}
			/>
		</tr>
	);
};

export default TableHeadings;
