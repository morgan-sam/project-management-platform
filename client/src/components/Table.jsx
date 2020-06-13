import React, { useState, useEffect, useCallback } from 'react';
import Task from 'components/Task';
import TableHeadings from 'components/TableHeadings';
import NoDataDisplay from 'components/NoDataDisplay';
import { getParentsClassList } from 'processing/processClassnames';

const Table = (props) => {
	const {
		filterOptions,
		setFilterOptions,
		taskList,
		selectedTasks,
		setSelectedTasks,
		sortOptions,
		setEntryCompletion,
		userSetSort,
		pressedKeys,
		visibleColumns
	} = props;

	const [ tableEntries, setTableEntries ] = useState([]);
	const [ initialID, setInitialID ] = useState();
	const [ selecting, setSelecting ] = useState(true);

	const getCompTaskList = () => {
		return taskList.map((el, i) => {
			return (
				<Task
					key={i}
					item={el}
					selected={selectedTasks.includes(el.id)}
					toggleSelectState={toggleSelectState}
					setSelectState={setSelectState}
					setEntryCompletion={setEntryCompletion}
					selecting={selecting}
					setSelecting={setSelecting}
					newTaskHover={newTaskHover}
					initialID={initialID}
					setInitialID={setInitialID}
					filterOptions={filterOptions}
					setFilterOptions={setFilterOptions}
					visibleColumns={visibleColumns}
				/>
			);
		});
	};

	const toggleSelectState = (id) => {
		if (selectedTasks.includes(id)) {
			const filtered = selectedTasks.filter((el) => el !== id);
			setSelectedTasks(filtered);
		} else setSelectedTasks([ ...selectedTasks, id ]);
	};

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
				console.log(initialID, dragToID);
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

	useEffect(() => {
		const handleClickOutside = (e) => {
			const clickClasses = getParentsClassList(e.target);
			if (clickClasses === '') return;
			const legalClasses = [ 'dataCell', 'taskManagerBtn', 'popUp', 'overlay', 'navMenu' ];
			const conditions = legalClasses.map((el) => Boolean(clickClasses.match(el)));
			if (!conditions.includes(true)) setSelectedTasks([]);
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	useEffect(
		() => {
			const tasks = getCompTaskList();
			setTableEntries(tasks);
		},
		[ taskList ]
	);

	return (
		<table className="table" style={props.style}>
			<thead>
				<TableHeadings sortOptions={sortOptions} userSetSort={userSetSort} visibleColumns={visibleColumns} />
			</thead>
			<tbody>{tableEntries}</tbody>
			{taskList.length === 0 && <NoDataDisplay visibleColumns={visibleColumns} />}
		</table>
	);
};

export default React.memo(Table);
