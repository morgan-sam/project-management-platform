import React from 'react';
import { fetchDeleteTasks } from 'data/fetch';
import { btnStyle, btnContainerStyle } from 'styling/taskManager';
import { checkIfAllSelectedAreComplete, getAllIds, checkIfAllTasksSelected } from 'processing/taskListSelection';

const TaskManager = (props) => {
	const { setSelectedTasks, setDataChanged, setEntryCompletion, rawTaskList, selectedTasks } = props;

	const selectedTaskChangeComplete = () => {
		setSelectedTasks([]);
		setDataChanged(true);
	};

	const deleteSelectedTasks = (selectedTaskIds) => {
		fetchDeleteTasks(selectedTaskIds);
		selectedTaskChangeComplete();
	};

	const setSelectedTaskCompletion = (taskIds) => {
		const newCompletion = !checkIfAllSelectedAreComplete(rawTaskList, selectedTasks);
		for (let i = 0; i < taskIds.length; i++) {
			const obj = rawTaskList.find((el) => el.id === taskIds[i]);
			setEntryCompletion(obj, newCompletion);
		}
		selectedTaskChangeComplete();
	};

	const selectAllTasks = () => {
		if (checkIfAllTasksSelected(rawTaskList, selectedTasks)) setSelectedTasks(getAllIds(rawTaskList));
		else setSelectedTasks([]);
	};

	return (
		<div className="taskManager" style={btnContainerStyle}>
			<button style={btnStyle}>New Task</button>
			<button style={btnStyle} onClick={() => deleteSelectedTasks(selectedTasks)}>
				Delete Selected Tasks
			</button>
			<button style={btnStyle} onClick={() => selectAllTasks()}>
				{checkIfAllTasksSelected(rawTaskList, selectedTasks) ? 'S' : 'Des'}elect All Tasks
			</button>
			<button style={btnStyle} onClick={() => setSelectedTaskCompletion(selectedTasks)}>
				Mark As {checkIfAllSelectedAreComplete(rawTaskList, selectedTasks) ? 'Inc' : 'C'}omplete
			</button>
		</div>
	);
};

export default TaskManager;
