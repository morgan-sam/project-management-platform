import React, { useState, useEffect } from 'react';
import Table from './Table';
import TaskManager from './TaskManager';
import FilterBar from './FilterBar';
import sortList from '../processing/sortList';
import { fetchGetEntries, fetchPutEntry } from '../data/fetch';
import { filterList, getTaskListTeams } from '../processing/filterList';

const App = () => {
	const [ sortOptions, setSortOptions ] = useState({
		type: 'date',
		reversed: false
	});

	const [ filterOptions, setFilterOptions ] = useState({
		active: true,
		date: '2000-01-01T00:00:00.000Z',
		deadline: '2025-01-01T00:00:00.000Z',
		completion: 'all',
		urgency: { min: 1, max: 5 },
		teams: 'all'
	});

	const [ rawTaskList, setRawTaskList ] = useState([]);
	const [ displayTaskList, setDisplayTaskList ] = useState([]);
	const [ selectedTasks, setSelectedTasks ] = useState([]);
	const [ dataChanged, setDataChanged ] = useState(false);

	function userSetSort(sort) {
		if (sort === sortOptions.type) {
			setSortOptions({ ...sortOptions, reversed: !sortOptions.reversed });
		} else {
			setSortOptions({
				type: sort,
				reversed: false
			});
		}
	}

	const setEntryCompletion = async (entry, completion) => {
		const newEntry = { ...entry, completed: completion };
		try {
			fetchPutEntry(newEntry);
			setDataChanged(true);
		} catch (error) {
			console.log(error);
		}
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
				let editedList = sortList(sortOptions, rawTaskList);
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
