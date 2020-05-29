import React, { useState, useEffect, useRef } from 'react';
import { ThemeProvider } from 'context/ThemeContext';
import MainTitle from 'components/MainTitle';
import Table from 'components/Table';
import TaskManager from 'components/TaskManager';
import FilterBar from 'components/FilterBar';
import DataInfoBar from 'components/DataInfoBar';
import AmbientBackground from 'components/AmbientBackground';
import sortList from 'processing/sortList';
import { fetchGetEntries, fetchPutEntry } from 'data/fetch';
import { filterOptionsDefault, displayBarsAll, visibleColumnsDefault, defaultPreferences } from 'data/defaultState';
import { filterList } from 'processing/filterList';
import { getTaskListTeams } from 'processing/teamsProcessing';
import NewTaskBar from 'components/NewTaskBar';
import {
	getScreenStyle,
	getMainPageStyle,
	tableStyle,
	overlayStyle,
	getTableContainerStyle,
	getTopBarsContainerStyle
} from 'styling/mainPage';

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
	const [ popUp, setPopUp ] = useState(null);

	const [ displayedBars, setDisplayedBars ] = useState(displayBarsAll(false));
	const [ displayBackground, setDisplayBackground ] = useState(true);
	const [ visibleColumns, setVisibleColumns ] = useState(visibleColumnsDefault);

	const [ preferences, setPreferences ] = useState(defaultPreferences);
	const [ colorTheme, setColorTheme ] = useState('#add8e6');
	const [ fixedStyle, setFixedStyle ] = useState(false);
	const [ barsAtTop, setBarsAtTop ] = useState(true);

	const [ barConHeight, setBarConHeight ] = useState(0);

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

	useEffect(
		() => {
			const barsOpen = Object.values(displayedBars).filter((el) => el).length;
			setBarConHeight(barsOpen * 100);
		},
		[ displayedBars ]
	);

	return (
		<ThemeProvider value={colorTheme}>
			<div className="screen" style={getScreenStyle(fixedStyle)}>
				<div className="mainPage" style={getMainPageStyle(popUp)}>
					<MainTitle />
					<TaskManager
						selectedTasks={selectedTasks}
						setSelectedTasks={setSelectedTasks}
						taskList={getTaskList()}
						rawTaskList={rawTaskList}
						setDataChanged={setDataChanged}
						setEntryCompletion={setEntryCompletion}
						displayedBars={displayedBars}
						setDisplayedBars={setDisplayedBars}
						pressedKeys={pressedKeys}
						setPopUp={setPopUp}
						displayBackground={displayBackground}
						setDisplayBackground={setDisplayBackground}
						visibleColumns={visibleColumns}
						setVisibleColumns={setVisibleColumns}
						preferences={preferences}
						setPreferences={setPreferences}
						fixedStyle={fixedStyle}
						setFixedStyle={setFixedStyle}
						barsAtTop={barsAtTop}
						setBarsAtTop={setBarsAtTop}
					/>
					<div className="topBars" style={getTopBarsContainerStyle(barsAtTop)}>
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
						<DataInfoBar
							taskList={getTaskList()}
							displayedBars={displayedBars}
							filterOptions={filterOptions}
							rawTaskList={rawTaskList}
						/>
					</div>
					<div
						className="tableContainer"
						style={getTableContainerStyle(fixedStyle, { barConHeight, displayedBars })}
					>
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
							visibleColumns={visibleColumns}
						/>
					</div>
					{popUp}
					{popUp && <div className={'overlay'} style={{ ...overlayStyle, opacity: '0.8' }} />}
					{displayBackground && <AmbientBackground />}
				</div>
			</div>
		</ThemeProvider>
	);
};

export default App;
