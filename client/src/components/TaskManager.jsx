import React from 'react';
import ColorButton from 'components/ColorButton';
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
		<div className="taskManager" style={{ ...props.style, ...btnContainerStyle }}>
			<ColorButton
				text={'New Task'}
				onClick={() => props.setDisplayNewTaskBar(!props.displayNewTaskBar)}
				color={'red'}
			/>
			<ColorButton
				text={'Delete Selected Tasks'}
				onClick={() => deleteSelectedTasks(selectedTasks)}
				color={'red'}
			/>
			<ColorButton
				text={`${checkIfAllTasksSelected(rawTaskList, selectedTasks) ? 'S' : 'Des'}elect All Tasks`}
				onClick={() => selectAllTasks()}
				color={'red'}
			/>
			<ColorButton
				text={`Mark As ${checkIfAllSelectedAreComplete(rawTaskList, selectedTasks) ? 'Inc' : 'C'}omplete`}
				onClick={() => setSelectedTaskCompletion(selectedTasks)}
				color={'red'}
			/>
		</div>
	);
};

export default TaskManager;
