import React from 'react';

import Task from './Task';

const App = () => {
	return (
		<div>
			<h1>PROJECT MANAGEMENT PLATFORM</h1>
			<Task task="Create App" date={'5/3/20'} deadline={'25/3/20'} urgency={'Moderate'} team={'Team 1'} />
		</div>
	);
};

export default App;
