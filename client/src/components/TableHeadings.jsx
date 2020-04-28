import React from 'react';
import HeadingCell from 'components/HeadingCell';

const TableHeadings = (props) => {
	const sortArrow = props.sortOptions.reversed ? '↓' : '↑';

	return (
		<tr className="tableHeadings" style={{ cursor: 'pointer', userSelect: 'none' }}>
			<HeadingCell
				className="taskCell"
				text={`Task ${props.sortOptions.type === 'task' ? sortArrow : ''}`}
				onClick={() => props.userSetSort('task')}
			/>
			<HeadingCell
				className="dateCell"
				text={`Date ${props.sortOptions.type === 'date' ? sortArrow : ''}`}
				onClick={() => props.userSetSort('date')}
			/>
			<HeadingCell
				className="deadlineCell"
				text={`Deadline ${props.sortOptions.type === 'deadline' ? sortArrow : ''}`}
				onClick={() => props.userSetSort('deadline')}
			/>
			<HeadingCell
				className="urgencyCell"
				text={`Urgency ${props.sortOptions.type === 'urgency' ? sortArrow : ''}`}
				onClick={() => props.userSetSort('urgency')}
			/>
			<HeadingCell
				className="teamCell"
				text={`Team ${props.sortOptions.type === 'team' ? sortArrow : ''}`}
				onClick={() => props.userSetSort('team')}
			/>
			<HeadingCell
				className="completedCell"
				text={`Completed ${props.sortOptions.type === 'completed' ? sortArrow : ''}`}
				onClick={() => props.userSetSort('completed')}
			/>
			<HeadingCell className="selectedCell" text={`X`} />
		</tr>
	);
};

export default TableHeadings;
