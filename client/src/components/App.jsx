import React, { useState, useEffect } from 'react';
import { ThemeProvider } from 'context/ThemeContext';
import MainTitle from 'components/MainTitle';
import Table from 'components/Table';
import TaskManager from 'components/TaskManager';
import PopUp from 'components/PopUp';
import ColorTest from 'components/ColorTest';
import FilterBar from 'components/FilterBar';
import sortList from 'processing/sortList';
import { fetchGetEntries, fetchPutEntry } from 'data/fetch';
import { filterOptionsDefault } from 'data/defaultState';
import { filterList, getTaskListTeams } from 'processing/filterList';
import NewTaskBar from 'components/NewTaskBar';
import { mainPageStyle, mainPageItemStyle } from 'styling/mainPage';

const App = () => {
	const [ sortOptions, setSortOptions ] = useState({
		type: 'date',
		reversed: false
	});

	const [ filterOptions, setFilterOptions ] = useState(filterOptionsDefault());
	const [ rawTaskList, setRawTaskList ] = useState([]);
	const [ selectedTasks, setSelectedTasks ] = useState([]);
	const [ dataChanged, setDataChanged ] = useState(false);
	const [ displayNewTaskBar, setDisplayNewTaskBar ] = useState(false);
	const [ colorTheme, setColorTheme ] = useState('#add8e6');

	const userSetSort = (sort) => {
		if (sort === sortOptions.type) {
			setSortOptions({ ...sortOptions, reversed: !sortOptions.reversed });
		} else {
			setSortOptions({
				type: sort,
				reversed: false
			});
		}
	};

	const setEntryCompletion = async (entry, completion) => {
		const newEntry = { ...entry, completed: completion };
		fetchPutEntry(newEntry);
		setDataChanged(true);
	};

	useEffect(
		() => {
			(async () => {
				const data = await fetchGetEntries();
				if (data) setRawTaskList(data);
				else setRawTaskList([]);
				setDataChanged(false);
			})();
		},
		[ dataChanged ]
	);

	const getTaskList = () => {
		const options = {
			sortOptions,
			selectedTasks
		};
		let editedList = rawTaskList;
		editedList = sortList(options, rawTaskList);
		if (filterOptions.active) editedList = filterList(filterOptions, editedList);
		return editedList;
	};

	return (
		<ThemeProvider value={colorTheme}>
			<div className="mainPage" style={mainPageStyle}>
				{/* <ColorTest /> */}
				<MainTitle style={mainPageItemStyle} />
				<TaskManager
					style={mainPageItemStyle}
					selectedTasks={selectedTasks}
					setSelectedTasks={setSelectedTasks}
					rawTaskList={rawTaskList}
					setDataChanged={setDataChanged}
					setEntryCompletion={setEntryCompletion}
					displayNewTaskBar={displayNewTaskBar}
					setDisplayNewTaskBar={setDisplayNewTaskBar}
					colorTheme={colorTheme}
				/>
				<FilterBar
					style={mainPageItemStyle}
					setFilterOptions={setFilterOptions}
					filterOptions={filterOptions}
					taskListTeams={[ 'all', ...getTaskListTeams(rawTaskList) ]}
					rawTaskList={rawTaskList}
					colorTheme={colorTheme}
				/>
				<NewTaskBar
					style={mainPageItemStyle}
					displayNewTaskBar={displayNewTaskBar}
					setDisplayNewTaskBar={setDisplayNewTaskBar}
					setDataChanged={setDataChanged}
					colorTheme={colorTheme}
				/>
				<Table
					style={mainPageItemStyle}
					sortOptions={sortOptions}
					userSetSort={(val) => userSetSort(val)}
					selectedTasks={selectedTasks}
					setSelectedTasks={setSelectedTasks}
					setDataChanged={setDataChanged}
					setEntryCompletion={setEntryCompletion}
					taskList={getTaskList()}
				/>
				<PopUp message={'Are you sure you want to delete # tasks from the database?'} />
			</div>
		</ThemeProvider>
	);
};

export default App;
