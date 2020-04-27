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

	const deleteSelectedTasks = (taskIds) => {
		for (let i = 0; i < taskIds.length; i++) {
			fetch('/tasks/' + taskIds[i], {
				method: 'delete'
			});
		}
		props.setSelectedTasks([]);
		props.setDataChanged(true);
	};

	const getAllIds = () => {
		return props.rawTaskList.map((el) => el.id);
	};

	const checkIfAllTasksSelected = () => {
		return getAllIds().length !== props.selectedTasks.length;
	};

	const selectAllTasks = () => {
		if (checkIfAllTasksSelected()) props.setSelectedTasks(getAllIds());
		else props.setSelectedTasks([]);
	};

	return (
		<div className="taskManager" style={btnContainerStyle}>
			<button style={btnStyle}>New Task</button>
			<button style={btnStyle} onClick={() => deleteSelectedTasks(props.selectedTasks)}>
				Delete Selected Tasks
			</button>
			<button style={btnStyle} onClick={() => selectAllTasks()}>
				{checkIfAllTasksSelected() ? 'S' : 'Des'}elect All Tasks
			</button>
			<button style={btnStyle}>BLANK</button>
		</div>
	);
};

export default TaskManager;
