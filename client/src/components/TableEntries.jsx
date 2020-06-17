import React, { useState, useEffect, useCallback } from 'react';
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

	const [ drag, setDrag ] = useState({
		start: null,
		end: null
	});

	const memoizedSetEntryCompletion = useCallback((item, completed) => setEntryCompletion(item, completed), []);

	const updateDragStart = useCallback(
		(id) =>
			setDrag((drag) => {
				return { ...drag, start: id };
			}),
		[]
	);

	const updateDragEnd = useCallback(
		(id) =>
			setDrag((drag) => {
				return { ...drag, end: id };
			}),
		[]
	);

	useEffect(
		() => {
			setSelectedTasks((selectedTasks) => {
				let tasksToSelect = getMouseSelectedTasks(drag);
				if (pressedKeys.includes('Control')) return [ ...new Set([ ...selectedTasks, ...tasksToSelect ]) ];
				else return [ ...tasksToSelect ];
			});
		},
		[ drag ]
	);

	//Remove current drag tasks from selected tasks state

	const getMouseSelectedTasks = (drag) => {
		const { start, end } = drag;
		let inScope = false;
		if (start === end || end === null) return [ start ];
		return [
			start,
			end,
			...taskList.flatMap((task) => {
				if (task.id === start || task.id === end) inScope = !inScope;
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
				setDrag,
				filterOptions,
				setFilterOptions,
				visibleColumns,
				updateDragStart,
				updateDragEnd
			}}
		/>
	));
};

export default TableEntries;
