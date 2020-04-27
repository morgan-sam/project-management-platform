import React, { useState } from 'react';
import Table from './Table';
import TaskManager from './TaskManager';
import FilterBar from './FilterBar';
import taskList from '../data/taskList';
import sortList from '../processing/sortList';
import { filterList, getTaskListTeams } from '../processing/filterList';

const App = () => {
	// const [ tableView, setTableView ] = useState('tasks');

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

	let displayList = sortList(sortOptions, taskList);
	if (filterOptions.active) displayList = filterList(filterOptions, displayList);

	return (
		<div className="mainPage">
			<h1>PROJECT MANAGEMENT PLATFORM</h1>
			<TaskManager />
			<FilterBar
				setFilterOptions={setFilterOptions}
				filterOptions={filterOptions}
				taskListTeams={[ 'all', ...getTaskListTeams(taskList) ]}
			/>
			<Table taskList={displayList} sortOptions={sortOptions} userSetSort={(val) => userSetSort(val)} />
		</div>
	);
};

export default App;
