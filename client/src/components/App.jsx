import React, { useState, useEffect } from 'react';
import Table from './Table';
import TaskManager from './TaskManager';
import FilterBar from './FilterBar';
import sortList from '../processing/sortList';
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

	useEffect(() => {
		(async () => {
			try {
				const data = await fetch('/tasks');
				const jsonData = await data.json();
				setRawTaskList(jsonData);
			} catch (error) {
				console.log(error);
			}
		})();
	}, []);

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
			<TaskManager />
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
			/>
		</div>
	);
};

export default App;
