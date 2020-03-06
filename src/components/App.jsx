import React, { useEffect, useState } from 'react';
import Table from './Table';
import taskList from '../data/taskList';
import sortList from '../processing/sortList';

const App = () => {
	// const [ tableView, setTableView ] = useState('tasks');
	const [ sortType, setSortType ] = useState('date');
	const sortedList = sortList(sortType, taskList);

	return (
		<div>
			<h1>PROJECT MANAGEMENT PLATFORM</h1>
			<Table taskList={sortedList} />
		</div>
	);
};

export default App;
