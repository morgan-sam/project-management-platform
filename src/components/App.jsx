import React, { useState } from 'react';
import Table from './Table';
import FilterBar from './FilterBar';
import taskList from '../data/taskList';
import sortList from '../processing/sortList';

const App = () => {
	// const [ tableView, setTableView ] = useState('tasks');

	const [ sortOptions, setSortOptions ] = useState({
		type: 'date',
		reversed: false
	});

	const [ filterOptions, setFilterOptions ] = useState({
		active: false,
		date: '2020-01-01T00:00:00.000Z',
		deadline: '2020-01-01T00:00:00.000Z'
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
	const sortedList = sortList(sortOptions, taskList);
	return (
		<div className="mainPage">
			<h1>PROJECT MANAGEMENT PLATFORM</h1>
			<FilterBar />
			<Table taskList={sortedList} sortOptions={sortOptions} userSetSort={(val) => userSetSort(val)} />
		</div>
	);
};

export default App;
