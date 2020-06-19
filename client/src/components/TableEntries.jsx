import React, { useState, useEffect, useCallback } from 'react';
import Task from 'components/Task';
import { combineRemoveBothDuplicates } from 'processing/utility';

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
		end: null,
		held: false,
		previous: [],
		current: []
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

	const updateDragHeld = useCallback(
		(boo) =>
			setDrag((drag) => {
				return { ...drag, held: boo };
			}),
		[]
	);

	useEffect(
		() => {
			setDrag((drag) => {
				let tasksToSelect = getMouseSelectedTasks(drag);
				return { ...drag, current: tasksToSelect };
			});
		},
		[ drag.end ]
	);

	useEffect(
		() => {
			const combinedArrs = combineRemoveBothDuplicates(drag.previous, drag.current);
			setSelectedTasks(combinedArrs);
		},
		[ drag.current ]
	);

	useEffect(
		() => {
			if (drag.held && !pressedKeys.includes('Control')) {
				const newCurrent = drag.previous.includes(drag.start) ? [] : [ drag.start ];
				setDrag({ ...drag, previous: [], current: newCurrent });
			} else if (drag.current.length > 0) {
				const nextPrev = combineRemoveBothDuplicates(drag.previous, drag.current);
				setDrag({ ...drag, previous: nextPrev, current: [] });
			}
		},
		[ drag.held ]
	);

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
				updateDragEnd,
				updateDragHeld
			}}
		/>
	));
};

export default TableEntries;
