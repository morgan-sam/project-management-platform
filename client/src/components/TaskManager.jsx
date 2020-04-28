import React from 'react';
import { fetchDeleteTasks } from '../data/fetch';
import { btnStyle, btnContainerStyle } from '../styling/taskManager';
import { checkIfAllSelectedAreComplete, getAllIds, checkIfAllTasksSelected } from '../processing/taskListSelection';

const TaskManager = (props) => {
	const selectedTaskChangeComplete = () => {
		props.setSelectedTasks([]);
		props.setDataChanged(true);
	};

	const deleteSelectedTasks = (selectedTaskIds) => {
		fetchDeleteTasks(selectedTaskIds);
		selectedTaskChangeComplete();
	};

	const setSelectedTaskCompletion = (taskIds) => {
		const newCompletion = !checkIfAllSelectedAreComplete(props.rawTaskList, props.selectedTasks);
		for (let i = 0; i < taskIds.length; i++) {
			const obj = props.rawTaskList.find((el) => el.id === taskIds[i]);
			props.setEntryCompletion(obj, newCompletion);
		}
		selectedTaskChangeComplete();
	};

	//////////////////////////////////////////////////////////////

	const selectAllTasks = () => {
		if (checkIfAllTasksSelected(props.rawTaskList, props.selectedTasks))
			props.setSelectedTasks(getAllIds(props.rawTaskList));
		else props.setSelectedTasks([]);
	};

	return (
		<div className="taskManager" style={btnContainerStyle}>
			<button style={btnStyle}>New Task</button>
			<button style={btnStyle} onClick={() => deleteSelectedTasks(props.selectedTasks)}>
				Delete Selected Tasks
			</button>
			<button style={btnStyle} onClick={() => selectAllTasks()}>
				{checkIfAllTasksSelected(props.rawTaskList, props.selectedTasks) ? 'S' : 'Des'}elect All Tasks
			</button>
			<button style={btnStyle} onClick={() => setSelectedTaskCompletion(props.selectedTasks)}>
				Mark As {checkIfAllSelectedAreComplete(props.rawTaskList, props.selectedTasks) ? 'Inc' : 'C'}omplete
			</button>
		</div>
	);
};

export default TaskManager;
