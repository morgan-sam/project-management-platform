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
	const [ selecting, setSelecting ] = useState(true);
	const memoizedSetEntryCompletion = useCallback((item, completed) => setEntryCompletion(item, completed), []);

	const toggleSelectState = useCallback((id) => {
		setSelectedTasks((selectedTasks) => {
			if (selectedTasks.includes(id)) return selectedTasks.filter((el) => el !== id);
			else return [ ...selectedTasks, id ];
		});
	}, []);

	const setSelectState = useCallback((id, state) => {
		setSelectedTasks((selectedTasks) => {
			const filtered = selectedTasks.filter((el) => el !== id);
			if (state) return [ ...filtered, id ];
			else return filtered;
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
				toggleSelectState,
				setSelectState,
				selecting,
				setSelecting,
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
