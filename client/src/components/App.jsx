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
		date: '2020-01-01T00:00:00.000Z',
		deadline: '2025-01-01T00:00:00.000Z',
		completion: 'all',
		urgency: { min: 1, max: 5 },
		teams: 'all'
	});

	const [ taskList, setTaskList ] = useState([]);

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

	useEffect(
		() => {
			(async () => {
				try {
					const data = await fetch('/tasks');
					const jsonData = await data.json();
					let sortedList = sortList(sortOptions, jsonData);
					if (filterOptions.active) sortedList = filterList(filterOptions, sortedList);
					setTaskList(sortedList);
				} catch (error) {
					console.log(error);
				}
			})();
		},
		[ filterOptions, sortOptions ]
	);

	return (
		<div className="mainPage">
			<h1>PROJECT MANAGEMENT PLATFORM</h1>
			<TaskManager />
			<FilterBar
				setFilterOptions={setFilterOptions}
				filterOptions={filterOptions}
				taskListTeams={[ 'all', ...getTaskListTeams(taskList) ]}
			/>
			<Table taskList={taskList} sortOptions={sortOptions} userSetSort={(val) => userSetSort(val)} />
		</div>
	);
};

export default App;
