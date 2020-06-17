import React, { useState, useCallback } from 'react';
import Task from 'components/Task';

const TableEntries = (props) => {
	const {
		filterOptions,
		setFilterOptions,
		taskList,
		selectedTasks,
		setSelectedTasks,
		setEntryCompletion,
		pressedKeys,
		visibleColumns
	} = props;

	const [ initialID, setInitialID ] = useState();
	const memoizedSetEntryCompletion = useCallback((item, completed) => setEntryCompletion(item, completed), []);

	const changeSelectState = useCallback((id) => {
		setSelectedTasks((selectedTasks) => {
			if (selectedTasks.length === 1 && selectedTasks[0] === id) return [];
			else if (!pressedKeys.includes('Control')) return [ id ];
			else if (selectedTasks.includes(id)) return selectedTasks.filter((el) => el !== id);
			else return [ ...selectedTasks, id ];
		});
	}, []);

	const newTaskHover = useCallback(
		(dragToID) => {
			setSelectedTasks((selectedTasks) => {
				let tasksToSelect = getMouseSelectedTasks(dragToID);
				if (pressedKeys.includes('Control')) return [ ...new Set([ ...selectedTasks, ...tasksToSelect ]) ];
				else return [ ...tasksToSelect ];
			});
		},
		[ initialID ]
	);

	const getMouseSelectedTasks = (dragToID) => {
		let inScope = false;
		if (initialID === dragToID) return [ initialID ];
		return [
			initialID,
			dragToID,
			...taskList.flatMap((task) => {
				if (task.id === initialID || task.id === dragToID) inScope = !inScope;
				return inScope ? task.id : [];
			})
		];
	};

	return taskList.map((el, i) => (
		<Task
			key={i}
			item={el}
			selected={selectedTasks.includes(el.id)}
			setEntryCompletion={memoizedSetEntryCompletion}
			{...{
				changeSelectState,
				newTaskHover,
				initialID,
				setInitialID,
				filterOptions,
				setFilterOptions,
				visibleColumns
			}}
		/>
	));
};

export default TableEntries;
