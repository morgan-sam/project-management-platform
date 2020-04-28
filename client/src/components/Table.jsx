import React, { useState, useEffect } from 'react';
import Task from 'components/Task';
import TableHeadings from 'components/TableHeadings';

const Table = (props) => {
	const [ displayList, setDisplayList ] = useState([]);

	useEffect(
		() => {
			const tasks = props.taskList.map((el, i) => {
				return (
					<Task
						key={i}
						item={el}
						selected={props.selectedTasks.includes(el.id)}
						setSelect={(id) => setSelectState(id)}
						setEntryCompletion={props.setEntryCompletion}
					/>
				);
			});
			setDisplayList(tasks);
		},
		[ props.taskList, props.selectedTasks ]
	);

	const setSelectState = (id) => {
		if (props.selectedTasks.includes(id)) {
			const filtered = props.selectedTasks.filter((el) => el !== id);
			props.setSelectedTasks(filtered);
		} else {
			props.setSelectedTasks([ ...props.selectedTasks, id ]);
		}
	};

	return (
		<table className="table">
			<TableHeadings sortOptions={props.sortOptions} userSetSort={(val) => props.userSetSort(val)} />
			{displayList}
		</table>
	);
};

export default Table;
