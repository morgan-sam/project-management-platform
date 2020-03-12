import React from 'react';

const TaskManager = (props) => {
	const btnStyle = {
		width: '5rem',
		height: '2rem',
		marginRight: '1rem'
	};

	const btnContainerStyle = {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'left'
	};

	return (
		<div className="taskManager" style={btnContainerStyle}>
			<button style={btnStyle}>New Task</button>
			<button style={btnStyle}>BLANK</button>
			<button style={btnStyle}>BLANK</button>
			<button style={btnStyle}>BLANK</button>
		</div>
	);
};

export default TaskManager;
