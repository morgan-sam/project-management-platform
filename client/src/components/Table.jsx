import React, { useState, useEffect } from 'react';
import Task from './Task';
import TableHeadings from './TableHeadings';

const Table = (props) => {
	const [ displayList, setDisplayList ] = useState([]);
	const [ selectedTasks, setSelectedTasks ] = useState([]);

	useEffect(
		() => {
			const tasks = props.taskList.map((el, i) => {
				return (
					<Task
						key={i}
						{...el}
						selected={selectedTasks.includes(el.id)}
						setSelect={(id) => setSelectState(id)}
					/>
				);
			});
			setDisplayList(tasks);
		},
		[ props.taskList, selectedTasks ]
	);

	const setSelectState = (id) => {
		if (selectedTasks.includes(id)) {
			const filtered = selectedTasks.filter((el) => el !== id);
			setSelectedTasks(filtered);
		} else {
			setSelectedTasks([ ...selectedTasks, id ]);
		}
	};

	return (
		<div className="table">
			<TableHeadings sortOptions={props.sortOptions} userSetSort={(val) => props.userSetSort(val)} />
			{displayList}
		</div>
	);
};

export default Table;
