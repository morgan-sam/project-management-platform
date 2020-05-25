import React, { useEffect } from 'react';
import ConfirmPopUp from 'components/ConfirmPopUp';
import { fetchDeleteTasks } from 'data/fetch';
import { checkIfAllSelectedAreComplete, getAllIds, checkIfAllTasksSelected } from 'processing/taskListSelection';
import BatchNewTasks from 'components/BatchNewTasks';
import NavigationMenu from 'components/NavigationMenu';

const TaskManager = (props) => {
	const {
		setSelectedTasks,
		setDataChanged,
		setEntryCompletion,
		rawTaskList,
		selectedTasks,
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

	const menus = [
		{
			name: 'File',
			sub: [
				{
					name: 'New Tasks',
					action: () => setPopUp(<BatchNewTasks setPopUp={setPopUp} setDataChanged={setDataChanged} />)
				}
			]
		},
		{
			name: 'Edit',
			sub: [
				{
					name: `${checkIfAllTasksSelected(rawTaskList, selectedTasks) ? 'S' : 'Des'}elect All`,
					action: () => selectAllTasks()
				},
				{
					name: `Mark ${checkIfAllSelectedAreComplete(rawTaskList, selectedTasks) ? 'Inc' : 'C'}omplete`,
					action: () => {
						if (selectedTasks.length) setSelectedTaskCompletion(selectedTasks);
					},
					enabled: selectedTasks.length > 0
				},
				{ name: 'Delete', action: () => deletePopUp(), enabled: selectedTasks.length > 0 }
			]
		},
		{
			name: 'View',
			sub: [
				{
					name: `${displayedBars.filter ? 'Hide' : 'Show'} Filter`,
					action: () => setDisplayedBars({ ...displayedBars, filter: !displayedBars.filter })
				},
				{
					name: 'New Task',
					action: () => setDisplayedBars({ ...displayedBars, newTask: !displayedBars.newTask })
				}
			]
		}
	];

	useEffect(
		() => {
			if (pressedKeys.includes('Delete')) deletePopUp();
		},
		[ pressedKeys ]
	);

	return <NavigationMenu menus={menus} />;
};

export default TaskManager;
