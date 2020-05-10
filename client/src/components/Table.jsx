import React, { useState, useEffect } from 'react';
import Task from 'components/Task';
import TableHeadings from 'components/TableHeadings';
import NoDataDisplay from 'components/NoDataDisplay';

const Table = (props) => {
	const { taskList, selectedTasks, setSelectedTasks, sortOptions, setEntryCompletion, userSetSort } = props;

	const getCompTaskList = () => {
		return taskList.map((el, i) => {
			return (
				<Task
					key={i}
					item={el}
					selected={selectedTasks.includes(el.id)}
					setSelect={(id) => setSelectState(id)}
					setEntryCompletion={setEntryCompletion}
				/>
			);
		});
	};

	const setSelectState = (id) => {
		if (selectedTasks.includes(id)) {
			const filtered = selectedTasks.filter((el) => el !== id);
			setSelectedTasks(filtered);
		} else {
			setSelectedTasks([ ...selectedTasks, id ]);
		}
	};

	return (
		<table className="table" style={props.style}>
			<thead>
				<TableHeadings sortOptions={sortOptions} userSetSort={(val) => userSetSort(val)} />
			</thead>
			<tbody>{getCompTaskList()}</tbody>
			{taskList.length === 0 && <NoDataDisplay />}
		</table>
	);
};

export default Table;
