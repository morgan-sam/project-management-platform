import React, { useState, useEffect } from 'react';
import Table from 'components/Table';
import TaskManager from 'components/TaskManager';
import FilterBar from 'components/FilterBar';
import sortList from 'processing/sortList';
import { fetchGetEntries, fetchPutEntry } from 'data/fetch';
import { filterOptionsDefault } from 'data/defaultState';
import { filterList, getTaskListTeams } from 'processing/filterList';
import NewTaskBar from './NewTaskBar';

const App = () => {
	const [ sortOptions, setSortOptions ] = useState({
		type: 'date',
		reversed: false
	});

	const [ filterOptions, setFilterOptions ] = useState(filterOptionsDefault());
	const [ rawTaskList, setRawTaskList ] = useState([]);
	const [ displayTaskList, setDisplayTaskList ] = useState([]);
	const [ selectedTasks, setSelectedTasks ] = useState([]);
	const [ dataChanged, setDataChanged ] = useState(false);

	const userSetSort = (sort) => {
		if (sort === sortOptions.type) {
			setSortOptions({ ...sortOptions, reversed: !sortOptions.reversed });
		} else {
			setSortOptions({
				type: sort,
				reversed: false
			});
		}
	};

	const setEntryCompletion = async (entry, completion) => {
		const newEntry = { ...entry, completed: completion };
		fetchPutEntry(newEntry);
		setDataChanged(true);
	};

	useEffect(
		() => {
			(async () => {
				const data = await fetchGetEntries();
				setRawTaskList(data);
				setDataChanged(false);
			})();
		},
		[ dataChanged ]
	);

	useEffect(
		() => {
			(async () => {
				const options = {
					sortOptions,
					selectedTasks
				};
				let editedList = sortList(options, rawTaskList);
				if (filterOptions.active) editedList = filterList(filterOptions, editedList);
				setDisplayTaskList(editedList);
			})();
		},
		[ rawTaskList, filterOptions, sortOptions ]
	);

	return (
		<div className="mainPage">
			<h1>PROJECT MANAGEMENT PLATFORM</h1>
			<TaskManager
				selectedTasks={selectedTasks}
				setSelectedTasks={setSelectedTasks}
				rawTaskList={rawTaskList}
				setDataChanged={setDataChanged}
				setEntryCompletion={setEntryCompletion}
			/>
			<FilterBar
				setFilterOptions={setFilterOptions}
				filterOptions={filterOptions}
				taskListTeams={[ 'all', ...getTaskListTeams(rawTaskList) ]}
			/>
			<NewTaskBar />
			<Table
				taskList={displayTaskList}
				sortOptions={sortOptions}
				userSetSort={(val) => userSetSort(val)}
				selectedTasks={selectedTasks}
				setSelectedTasks={setSelectedTasks}
				setDataChanged={setDataChanged}
				setEntryCompletion={setEntryCompletion}
			/>
		</div>
	);
};

export default App;
