import React from 'react';

const TaskManager = (props) => {
	const btnStyle = {
		width: 'auto',
		height: '2rem',
		marginRight: '1rem'
	};

	const btnContainerStyle = {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'left',
		border: '1px solid black',
		padding: '0.8rem'
	};

	return (
		<div className="taskManager" style={btnContainerStyle}>
			<button style={btnStyle}>New Task</button>
			<button style={btnStyle}>Delete Selected Tasks</button>
			<button style={btnStyle}>BLANK</button>
			<button style={btnStyle}>BLANK</button>
		</div>
	);
};

export default TaskManager;
