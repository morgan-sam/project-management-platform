import React from 'react';
import Task from './Task';
import TableHeadings from './TableHeadings';

const Table = (props) => {
	const tasks = props.taskList.map((el) => <Task {...el} />);

	return (
		<div className="table">
			<TableHeadings />
			{tasks}
		</div>
	);
};

export default Table;
