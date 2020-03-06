import React from 'react';
import Table from './Table';
import taskList from '../data/taskList';

const App = () => {
	//set state to determine what mode table is in

	//sort tasklist according to state

	return (
		<div>
			<h1>PROJECT MANAGEMENT PLATFORM</h1>
			<Table taskList={taskList} />
		</div>
	);
};

export default App;
