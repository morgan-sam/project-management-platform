import React from 'react';
import Task from './Task';
import TableHeadings from './TableHeadings';

const Table = (props) => {
	return (
		<div className="table">
			<TableHeadings />
			<Task task="Create App" date={'5/3/20'} deadline={'25/3/20'} urgency={'Moderate'} team={'Team 1'} />
		</div>
	);
};

export default Table;
