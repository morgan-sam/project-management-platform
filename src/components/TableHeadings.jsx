import React from 'react';
import Cell from './Cell';

const TableHeadings = (props) => {
	return (
		<div className="tableHeadings" style={{ cursor: 'pointer' }}>
			<Cell text={'Task'} onClick={() => props.setSortType('task')} />
			<Cell text={'Date'} onClick={() => props.setSortType('date')} />
			<Cell text={'Deadline'} onClick={() => props.setSortType('deadline')} />
			<Cell text={'Urgency'} onClick={() => props.setSortType('urgency')} />
			<Cell text={'Team'} onClick={() => props.setSortType('team')} />
			<Cell text={'Completed'} onClick={() => props.setSortType('completed')} />
		</div>
	);
};

export default TableHeadings;
