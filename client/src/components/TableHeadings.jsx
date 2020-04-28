import React from 'react';
import Cell from 'components/Cell';

const TableHeadings = (props) => {
	const sortArrow = props.sortOptions.reversed ? '↓' : '↑';

	return (
		<div className="tableHeadings" style={{ cursor: 'pointer', userSelect: 'none' }}>
			<Cell
				className="headingCell taskCell"
				text={`Task ${props.sortOptions.type === 'task' ? sortArrow : ''}`}
				onClick={() => props.userSetSort('task')}
			/>
			<Cell
				className="headingCell dateCell"
				text={`Date ${props.sortOptions.type === 'date' ? sortArrow : ''}`}
				onClick={() => props.userSetSort('date')}
			/>
			<Cell
				className="headingCell deadlineCell"
				text={`Deadline ${props.sortOptions.type === 'deadline' ? sortArrow : ''}`}
				onClick={() => props.userSetSort('deadline')}
			/>
			<Cell
				className="headingCell urgencyCell"
				text={`Urgency ${props.sortOptions.type === 'urgency' ? sortArrow : ''}`}
				onClick={() => props.userSetSort('urgency')}
			/>
			<Cell
				className="headingCell teamCell"
				text={`Team ${props.sortOptions.type === 'team' ? sortArrow : ''}`}
				onClick={() => props.userSetSort('team')}
			/>
			<Cell
				className="headingCell completedCell"
				text={`Completed ${props.sortOptions.type === 'completed' ? sortArrow : ''}`}
				onClick={() => props.userSetSort('completed')}
			/>
			<Cell className="headingCell selectedCell" text={`X`} />
		</div>
	);
};

export default TableHeadings;
