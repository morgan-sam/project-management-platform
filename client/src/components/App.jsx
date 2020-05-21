import React, { useState, useEffect } from 'react';
import { ThemeProvider } from 'context/ThemeContext';
import MainTitle from 'components/MainTitle';
import Table from 'components/Table';
import TaskManager from 'components/TaskManager';
import ColorTest from 'components/ColorTest';
import FilterBar from 'components/FilterBar';
import sortList from 'processing/sortList';
import { fetchGetEntries, fetchPutEntry } from 'data/fetch';
import { filterOptionsDefault } from 'data/defaultState';
import { filterList } from 'processing/filterList';
import { getTaskListTeams } from 'processing/teamsProcessing';
import NewTaskBar from 'components/NewTaskBar';
import { getMainPageStyle, taskManagerStyle, tableStyle, overlayStyle } from 'styling/mainPage';

const App = () => {
	const [ sortOptions, setSortOptions ] = useState({
		type: 'date',
		reversed: false
	});
	const [ pressedKeys, setPressedKeys ] = useState([]);
	const [ filterOptions, setFilterOptions ] = useState(filterOptionsDefault());
	const [ rawTaskList, setRawTaskList ] = useState([]);
	const [ selectedTasks, setSelectedTasks ] = useState([]);
	const [ dataChanged, setDataChanged ] = useState(false);
	const [ displayedBars, setDisplayedBars ] = useState({
		filter: true,
		newTask: false
	});
	const [ colorTheme, setColorTheme ] = useState('#add8e6');
	const [ popUp, setPopUp ] = useState(null);

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
				if (data) {
					if (rawTaskList.length === 0) setFilterOptions(filterOptionsDefault(data));
					setRawTaskList(data);
				} else setRawTaskList([]);
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

	React.useEffect(() => {
		const handleKeyDown = (e) =>
			setPressedKeys((prevPressed) => [ ...prevPressed.filter((k) => k !== e.key), e.key ]);
		const handleKeyUp = (e) => setPressedKeys(pressedKeys.filter((k) => k !== e.key));
		document.addEventListener('keydown', handleKeyDown);
		document.addEventListener('keyup', handleKeyUp);
		return () => {
			document.removeEventListener('keydown', handleKeyDown);
			document.removeEventListener('keyup', handleKeyUp);
		};
	}, []);

	return (
		<ThemeProvider value={colorTheme}>
			<div className="mainPage" style={getMainPageStyle(popUp)}>
				{/* <ColorTest /> */}
				<MainTitle />
				<TaskManager
					style={taskManagerStyle}
					selectedTasks={selectedTasks}
					setSelectedTasks={setSelectedTasks}
					rawTaskList={rawTaskList}
					setDataChanged={setDataChanged}
					setEntryCompletion={setEntryCompletion}
					displayedBars={displayedBars}
					setDisplayedBars={setDisplayedBars}
					pressedKeys={pressedKeys}
					setPopUp={setPopUp}
				/>
				<FilterBar
					setFilterOptions={setFilterOptions}
					filterOptions={filterOptions}
					taskListTeams={[ 'all', ...getTaskListTeams(rawTaskList) ]}
					rawTaskList={rawTaskList}
					displayedBars={displayedBars}
				/>
				<NewTaskBar
					displayedBars={displayedBars}
					setDisplayedBars={setDisplayedBars}
					setDataChanged={setDataChanged}
				/>
				<Table
					style={tableStyle}
					filterOptions={filterOptions}
					setFilterOptions={setFilterOptions}
					sortOptions={sortOptions}
					userSetSort={userSetSort}
					selectedTasks={selectedTasks}
					setSelectedTasks={setSelectedTasks}
					setDataChanged={setDataChanged}
					setEntryCompletion={setEntryCompletion}
					taskList={getTaskList()}
					pressedKeys={pressedKeys}
				/>
				{popUp}
				{popUp && <div className={'overlay'} style={{ ...overlayStyle, opacity: '0.8' }} />}
			</div>
		</ThemeProvider>
	);
};

export default App;
