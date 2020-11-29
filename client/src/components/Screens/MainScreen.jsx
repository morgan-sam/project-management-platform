import React, { useState, useEffect } from 'react';
import { ThemeProvider } from 'context/ThemeContext';
import MainTitle from 'components/MainTitle';
import AccountInfo from 'components/AccountInfo';
import Table from 'components/Table';
import TaskManager from 'components/TaskManager';
import FilterBar from 'components/Taskbars/FilterBar';
import DataInfoBar from 'components/Taskbars/DataInfoBar';
import AmbientBackground from 'components/AmbientBackground';
import sortList from 'processing/sortList';
import { fetchGetEntries, fetchPutEntry } from 'data/fetch';
import {
    getDefaultFilterOptions,
    displayBarsAll,
    visibleColumnsDefault,
    defaultPreferences
} from 'data/defaultState';
import { filterList } from 'processing/filterList';
import { getTaskListTeams } from 'processing/teams';
import CreateTaskBar from 'components/Taskbars/CreateTaskBar';
import {
    Screen,
    MainPage,
    Overlay,
    TableContainer,
    TopBarsContainer
} from 'styling/mainPage';

const MainScreen = (props) => {
    const [sortOptions, setSortOptions] = useState({
        type: 'date',
        reversed: false
    });
    const [pressedKeys, setPressedKeys] = useState([]);
    const [filterOptions, setFilterOptions] = useState(
        getDefaultFilterOptions()
    );
    const [rawTaskList, setRawTaskList] = useState([]);
    const [selectedTasks, setSelectedTasks] = useState([]);
    const [dataChanged, setDataChanged] = useState(false);
    const [popUp, setPopUp] = useState(null);

    const [displayedBars, setDisplayedBars] = useState(displayBarsAll(false));
    const [displayBackground, setDisplayBackground] = useState(true);
    const [visibleColumns, setVisibleColumns] = useState(visibleColumnsDefault);

    const [preferences, setPreferences] = useState(defaultPreferences);
    const [colorTheme, setColorTheme] = useState('#add8e6');
    const [fixedStyle, setFixedStyle] = useState(false);
    const [barsFloating, setBarsFloating] = useState(true);

    const [barConHeight, setBarConHeight] = useState(0);

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

    useEffect(() => {
        (async () => {
            const data = await fetchGetEntries();
            if (data) {
                if (rawTaskList.length === 0)
                    setFilterOptions(getDefaultFilterOptions(data));
                setRawTaskList(data);
            } else setRawTaskList([]);
            setDataChanged(false);
        })();
    }, [dataChanged]);

    const getTaskList = () => {
        const options = {
            sortOptions,
            selectedTasks
        };
        let editedList = rawTaskList;
        editedList = sortList(options, rawTaskList);
        if (filterOptions.active)
            editedList = filterList(filterOptions, editedList);
        return editedList;
    };

    React.useEffect(() => {
        const handleKeyDown = (e) =>
            setPressedKeys((prevPressed) => [
                ...prevPressed.filter((k) => k !== e.key),
                e.key
            ]);
        const handleKeyUp = (e) =>
            setPressedKeys(pressedKeys.filter((k) => k !== e.key));
        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('keyup', handleKeyUp);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    useEffect(() => {
        const barsOpen = Object.values(displayedBars).filter((el) => el).length;
        setBarConHeight(barsOpen * 100);
    }, [displayedBars]);

    return (
        <ThemeProvider value={colorTheme}>
            <Screen fixedStyle={fixedStyle}>
                <MainPage scrollLocked={popUp}>
                    <MainTitle />
                    <AccountInfo />
                    <TaskManager
                        taskList={getTaskList()}
                        {...{
                            selectedTasks,
                            setSelectedTasks,
                            rawTaskList,
                            setDataChanged,
                            setEntryCompletion,
                            displayedBars,
                            setDisplayedBars,
                            pressedKeys,
                            setPopUp,
                            displayBackground,
                            setDisplayBackground,
                            visibleColumns,
                            setVisibleColumns,
                            preferences,
                            setPreferences,
                            fixedStyle,
                            setFixedStyle,
                            barsFloating,
                            setBarsFloating,
                            setColorTheme
                        }}
                    />
                    <TopBarsContainer barsAtTop={barsFloating}>
                        <FilterBar
                            taskListTeams={[
                                'all',
                                ...getTaskListTeams(rawTaskList)
                            ]}
                            {...{
                                setFilterOptions,
                                filterOptions,
                                rawTaskList,
                                displayedBars
                            }}
                        />
                        <CreateTaskBar
                            {...{
                                displayedBars,
                                setDisplayedBars,
                                setDataChanged
                            }}
                        />
                        <DataInfoBar
                            taskList={getTaskList()}
                            {...{
                                displayedBars,
                                filterOptions,
                                rawTaskList
                            }}
                        />
                    </TopBarsContainer>
                    <TableContainer
                        className="tableContainer"
                        fixedStyle={fixedStyle}
                        barConHeight={barConHeight}
                        displayedBars={displayedBars}
                    >
                        <Table
                            taskList={getTaskList()}
                            {...{
                                filterOptions,
                                setFilterOptions,
                                sortOptions,
                                userSetSort,
                                selectedTasks,
                                setSelectedTasks,
                                setDataChanged,
                                setEntryCompletion,
                                pressedKeys,
                                visibleColumns
                            }}
                        />
                    </TableContainer>
                    {popUp}
                    {popUp && <Overlay />}
                    {displayBackground && <AmbientBackground />}
                </MainPage>
            </Screen>
        </ThemeProvider>
    );
};

export default MainScreen;
