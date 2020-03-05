import React from 'react';
import Cell from './Cell';

const TableHeadings = () => {
	return (
		<div className="tableHeadings">
			<Cell text={'Task'} />
			<Cell text={'Date'} />
			<Cell text={'Deadline'} />
			<Cell text={'Urgency'} />
			<Cell text={'Team'} />
			<Cell text={'Completed'} />
		</div>
	);
};

export default TableHeadings;
