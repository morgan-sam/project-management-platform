import React, { useState, useEffect } from 'react';
import Task from './Task';
import TableHeadings from './TableHeadings';

const Table = (props) => {
	const [ displayList, setDisplayList ] = useState([]);

	useEffect(
		() => {
			const tasks = props.taskList.map((el, i) => <Task key={i} {...el} />);
			setDisplayList(tasks);
		},
		[ props.taskList ]
	);

	return (
		<div className="table">
			<TableHeadings sortOptions={props.sortOptions} userSetSort={(val) => props.userSetSort(val)} />
			{displayList}
		</div>
	);
};

export default Table;
