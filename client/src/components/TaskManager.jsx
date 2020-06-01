import React, { useEffect } from 'react';
import ConfirmPopUp from 'components/ConfirmPopUp';
import { fetchDeleteTasks } from 'data/fetch';
import { checkIfAllSelectedAreComplete, getAllIds, checkIfAllTasksSelected } from 'processing/taskListSelection';
import BatchNewTasks from 'components/BatchNewTasks';
import NavigationMenu from 'components/NavigationMenu';
import Preferences from 'components/Preferences';
import { displayBarsAll } from 'data/defaultState';
import { BOX_BORDER_WIDTH_PX } from 'styling/navigationMenu';
import { fields } from 'data/table';
import { capitalizeFirstLetter } from 'processing/utility';
import { visibleColumnsDefault } from 'data/defaultState';

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
		taskList,
		setDisplayedBars,
		displayBackground,
		setDisplayBackground,
		visibleColumns,
		setVisibleColumns,
		preferences,
		setPreferences,
		fixedStyle,
		setFixedStyle,
		barsFloating,
		setBarsFloating
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

	const deletePopUp = (arrayOfIds, description) => {
		if (arrayOfIds.length)
			setPopUp(
				<ConfirmPopUp
					message={`You are deleting ${description}. Are you sure you want to delete ${arrayOfIds.length} tasks?`}
					confirm={() => deleteSelectedTasks(arrayOfIds)}
					pressedKeys={pressedKeys}
					setPopUp={setPopUp}
				/>
			);
	};

	const getFilteredTaskIds = () => {
		const allIds = rawTaskList.map((el) => el.id);
		const keptIds = taskList.map((el) => el.id);
		return allIds.filter((el) => keptIds.indexOf(el) === -1);
	};

	const getColumnVisibilityMenus = () => {
		return fields.map((field) => {
			const newObj = Object.assign({}, visibleColumns);
			newObj[field] = !visibleColumns[field];
			return {
				name: field === 'id' ? 'ID' : capitalizeFirstLetter(field),
				action: () => setVisibleColumns(newObj),
				checkbox: visibleColumns[field]
			};
		});
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
				{
					name: 'Delete',
					sub: [
						{
							name: 'Delete Selected',
							enabled: selectedTasks.length > 0,
							action: () => deletePopUp(selectedTasks, 'all selected entries')
						},
						{
							name: 'Delete Filtered',
							enabled: getFilteredTaskIds().length > 0,
							action: () =>
								deletePopUp(getFilteredTaskIds(), 'all entries that do not pass the filter parameters')
						}
					]
				},
				{
					name: 'Preferences',
					action: () =>
						setPopUp(
							<Preferences
								setPopUp={setPopUp}
								preferences={preferences}
								setPreferences={setPreferences}
							/>
						)
				}
			]
		},
		{
			name: 'View',
			sub: [
				{
					name: 'Taskbars',
					sub: [
						{
							name: 'Floating',
							action: () => setBarsFloating(!barsFloating),
							checkbox: barsFloating
						},
						{
							name: `${Object.values(displayedBars).includes(true) ? 'Close' : 'Open'} All`,
							action: () => {
								const boo = !Object.values(displayedBars).includes(true);
								setDisplayedBars(displayBarsAll(boo));
							}
						},
						{
							name: `${displayedBars.filter ? 'Hide' : 'Show'} Filter`,
							action: () => setDisplayedBars({ ...displayedBars, filter: !displayedBars.filter })
						},
						{
							name: `${displayedBars.newTask ? 'Hide' : 'Show'} New Task`,
							action: () => setDisplayedBars({ ...displayedBars, newTask: !displayedBars.newTask })
						},
						{
							name: `${displayedBars.dataInfo ? 'Hide' : 'Show'} Data Info`,
							action: () => setDisplayedBars({ ...displayedBars, dataInfo: !displayedBars.dataInfo })
						}
					]
				},
				{
					name: 'Columns',
					sub: [
						{ name: 'Reset To Default', action: () => setVisibleColumns(visibleColumnsDefault) },
						...getColumnVisibilityMenus()
					]
				},
				{
					name: `${displayBackground ? 'Hide' : 'Show'} Background`,
					action: () => setDisplayBackground(!displayBackground)
				},
				{
					name: `Use ${fixedStyle ? 'Scroll' : 'Fixed'} View`,
					action: () => setFixedStyle(!fixedStyle)
				}
			]
		}
	];

	useEffect(
		() => {
			if (pressedKeys.includes('Delete')) deletePopUp(selectedTasks, 'all selected entries');
		},
		[ pressedKeys ]
	);

	const navMenuStyle = {
		position: 'fixed',
		top: `-${BOX_BORDER_WIDTH_PX}px`,
		left: `-${BOX_BORDER_WIDTH_PX}px`
	};

	return <NavigationMenu style={navMenuStyle} menus={menus} />;
};

export default TaskManager;
