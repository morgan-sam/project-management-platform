import React, { useState, useEffect } from 'react';
import Task from 'components/Task';
import TableHeadings from 'components/TableHeadings';
import NoDataDisplay from 'components/NoDataDisplay';

const Table = (props) => {
	const { taskList, selectedTasks, setSelectedTasks, sortOptions, setEntryCompletion, userSetSort } = props;

	const [ initialID, setInitialID ] = useState();
	const [ selecting, setSelecting ] = useState(true);

	const getCompTaskList = () => {
		return taskList.map((el, i) => {
			return (
				<Task
					key={i}
					item={el}
					selected={selectedTasks.includes(el.id)}
					toggleSelectState={(id) => toggleSelectState(id)}
					setSelectState={(id, state) => setSelectState(id, state)}
					setEntryCompletion={setEntryCompletion}
					selecting={selecting}
					setSelecting={setSelecting}
					newTaskHover={newTaskHover}
					initialID={initialID}
					setInitialID={setInitialID}
				/>
			);
		});
	};

	const toggleSelectState = (id) => {
		if (selectedTasks.includes(id)) {
			const filtered = selectedTasks.filter((el) => el !== id);
			setSelectedTasks(filtered);
		} else setSelectedTasks([ ...selectedTasks, id ]);
	};

	const setSelectState = (id, state) => {
		const filtered = selectedTasks.filter((el) => el !== id);
		if (state) setSelectedTasks([ ...filtered, id ]);
		else setSelectedTasks(filtered);
	};

	const newTaskHover = (id) => {
		setSelectState(id, selecting);
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
