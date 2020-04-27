import React from 'react';
import Cell from './Cell';

const TableHeadings = (props) => {
	const sortArrow = props.sortOptions.reversed ? '↓' : '↑';

	return (
		<div className="tableHeadings" style={{ cursor: 'pointer', userSelect: 'none' }}>
			<Cell
				className="taskCell"
				text={`Task ${props.sortOptions.type === 'task' ? sortArrow : ''}`}
				onClick={() => props.userSetSort('task')}
			/>
			<Cell
				className="dateCell"
				text={`Date ${props.sortOptions.type === 'date' ? sortArrow : ''}`}
				onClick={() => props.userSetSort('date')}
			/>
			<Cell
				className="deadlineCell"
				text={`Deadline ${props.sortOptions.type === 'deadline' ? sortArrow : ''}`}
				onClick={() => props.userSetSort('deadline')}
			/>
			<Cell
				className="urgencyCell"
				text={`Urgency ${props.sortOptions.type === 'urgency' ? sortArrow : ''}`}
				onClick={() => props.userSetSort('urgency')}
			/>
			<Cell
				className="teamCell"
				text={`Team ${props.sortOptions.type === 'team' ? sortArrow : ''}`}
				onClick={() => props.userSetSort('team')}
			/>
			<Cell
				className="completedCell"
				text={`Completed ${props.sortOptions.type === 'completed' ? sortArrow : ''}`}
				onClick={() => props.userSetSort('completed')}
			/>
		</div>
	);
};

export default TableHeadings;
