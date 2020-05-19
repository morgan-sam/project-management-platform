import React, { useEffect } from 'react';
import ColorButton from 'components/ColorButton';
import ConfirmPopUp from 'components/ConfirmPopUp';
import { fetchDeleteTasks } from 'data/fetch';
import { btnStyle, btnContainerStyle } from 'styling/taskManager';
import { checkIfAllSelectedAreComplete, getAllIds, checkIfAllTasksSelected } from 'processing/taskListSelection';
import BatchNewTasks from 'components/BatchNewTasks';

const TaskManager = (props) => {
	const {
		setSelectedTasks,
		setDataChanged,
		setEntryCompletion,
		rawTaskList,
		selectedTasks,
		colorTheme,
		setPopUp,
		pressedKeys,
		displayedBars,
		setDisplayedBars
	} = props;

	const selectedTaskChangeComplete = () => {
		setSelectedTasks([]);
		setDataChanged(true);
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

	const deleteSelectedTasks = (selectedTaskIds) => {
		fetchDeleteTasks(selectedTaskIds);
		selectedTaskChangeComplete();
	};

	const deletePopUp = () => {
		{
			if (selectedTasks.length)
				setPopUp(
					<ConfirmPopUp
						message={`Are you sure you want to delete ${selectedTasks.length} tasks?`}
						confirm={() => deleteSelectedTasks(selectedTasks)}
						pressedKeys={pressedKeys}
						setPopUp={setPopUp}
					/>
				);
		}
	};

	useEffect(
		() => {
			if (pressedKeys.includes('Delete')) deletePopUp();
		},
		[ pressedKeys ]
	);

	console.log(displayedBars);

	return (
		<div className="taskManager" style={{ ...props.style, ...btnContainerStyle }}>
			<ColorButton
				className={'taskManagerBtn'}
				text={'New Task'}
				onClick={() => setDisplayedBars({ ...displayedBars, newTask: !displayedBars.newTask })}
				color={colorTheme}
			/>
			<ColorButton
				className={'taskManagerBtn'}
				text={'Filter'}
				onClick={() => setDisplayedBars({ ...displayedBars, filter: !displayedBars.filter })}
				color={colorTheme}
			/>
			<ColorButton
				className={'taskManagerBtn'}
				text={'Batch New Tasks'}
				onClick={() =>
					setPopUp(
						<BatchNewTasks colorTheme={colorTheme} setPopUp={setPopUp} setDataChanged={setDataChanged} />
					)}
				color={colorTheme}
			/>
			<ColorButton
				className={'taskManagerBtn'}
				text={'Delete Selected Tasks'}
				onClick={() => deletePopUp()}
				enabled={selectedTasks.length}
				color={colorTheme}
			/>
			<ColorButton
				className={'taskManagerBtn'}
				text={`${checkIfAllTasksSelected(rawTaskList, selectedTasks) ? 'S' : 'Des'}elect All Tasks`}
				onClick={() => selectAllTasks()}
				color={colorTheme}
			/>
			<ColorButton
				className={'taskManagerBtn'}
				text={`Mark As ${checkIfAllSelectedAreComplete(rawTaskList, selectedTasks) ? 'Inc' : 'C'}omplete`}
				onClick={() => {
					if (selectedTasks.length) setSelectedTaskCompletion(selectedTasks);
				}}
				color={colorTheme}
				enabled={selectedTasks.length}
			/>
		</div>
	);
};

export default TaskManager;
