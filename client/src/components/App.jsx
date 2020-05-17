import React, { useState, useEffect } from 'react';
import { ThemeProvider } from 'context/ThemeContext';
import MainTitle from 'components/MainTitle';
import Table from 'components/Table';
import TaskManager from 'components/TaskManager';
import BatchNewTasks from 'components/BatchNewTasks';
import ColorTest from 'components/ColorTest';
import FilterBar from 'components/FilterBar';
import sortList from 'processing/sortList';
import { fetchGetEntries, fetchPutEntry } from 'data/fetch';
import { filterOptionsDefault } from 'data/defaultState';
import { filterList, getTaskListTeams } from 'processing/filterList';
import NewTaskBar from 'components/NewTaskBar';
import { getMainPageStyle, mainPageItemStyle, overlayStyle } from 'styling/mainPage';
import { fetchDeleteTasks } from 'data/fetch';

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
	const [ displayNewTaskBar, setDisplayNewTaskBar ] = useState(false);
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
					pressedKeys={pressedKeys}
					setPopUp={setPopUp}
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
					pressedKeys={pressedKeys}
				/>
				{popUp}
				{popUp && <div className={'overlay'} style={overlayStyle} />}
			</div>
		</ThemeProvider>
	);
};

export default App;
