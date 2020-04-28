import React from 'react';
import { btnStyle, btnContainerStyle } from '../styling/taskManager';

const TaskManager = (props) => {
	const selectedTaskChangeComplete = () => {
		props.setSelectedTasks([]);
		props.setDataChanged(true);
	};

	const deleteSelectedTasks = (taskIds) => {
		for (let i = 0; i < taskIds.length; i++) {
			fetch(`/tasks/${taskIds[i]}`, {
				method: 'delete'
			});
		}
		selectedTaskChangeComplete();
	};

	const setSelectedTaskCompletion = (taskIds) => {
		const newCompletion = !checkIfAllSelectedAreComplete();
		for (let i = 0; i < taskIds.length; i++) {
			const obj = props.rawTaskList.find((el) => el.id === taskIds[i]);
			props.setEntryCompletion(obj, newCompletion);
		}
		selectedTaskChangeComplete();
	};

	//////////////////////////////////////////////////////////////

	const checkIfAllSelectedAreComplete = () => {
		const selectedItems = props.rawTaskList.filter((el) => props.selectedTasks.includes(el.id));
		return (
			Boolean(selectedItems.length) && selectedItems.length === selectedItems.filter((el) => el.completed).length
		);
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
			<button style={btnStyle} onClick={() => setSelectedTaskCompletion(props.selectedTasks)}>
				Mark As {checkIfAllSelectedAreComplete() ? 'Inc' : 'C'}omplete
			</button>
		</div>
	);
};

export default TaskManager;
