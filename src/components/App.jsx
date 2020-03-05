import React from 'react';
import Table from './Table';
import taskList from '../data/taskList';

const App = () => {
	return (
		<div>
			<h1>PROJECT MANAGEMENT PLATFORM</h1>
			<Table taskList={taskList} />
		</div>
	);
};

export default App;
