import React, { useEffect } from 'react';
import ConfirmPopUp from 'components/PopUps/ConfirmPopUp';
import MessagePopUp from 'components/PopUps/MessagePopUp';
import { fetchDeleteTasks } from 'data/fetch';
import {
    checkIfAllSelectedAreComplete,
    getAllIds,
    checkIfAllTasksSelected
} from 'processing/taskListSelection';
import BatchNewTasks from 'components/PopUps/BatchNewTasks';
import BatchDeleteTasks from 'components/PopUps/BatchDeleteTasks';
import NavigationMenu from 'components/NavigationMenu';
import Preferences from 'components/PopUps/Preferences';
import ChangeValue from 'components/PopUps/ChangeValue';
import { displayBarsAll } from 'data/defaultState';
import { BOX_BORDER_WIDTH_PX } from 'styling/navigationMenu';
import { fields } from 'data/table';
import { capitalizeFirstLetter } from 'processing/utility';
import { visibleColumnsDefault } from 'data/defaultState';
import { themeColors } from 'data/themeColors';
import app from 'config/firebase';

const TaskManager = (props) => {
    const {
        setCurrentUser,
        setSelectedTasks,
        setDataChanged,
        setEntryCompletion,
        rawTaskList,
        selectedTasks,
        setPopUp,
        pressedKeys,
        displayedBars,
        taskList,
        setDisplayedBars,
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
    } = props;

    const selectedTaskChangeComplete = () => {
        setSelectedTasks([]);
        setDataChanged(true);
    };
    const setSelectedTaskCompletion = (taskIds) => {
        const newCompletion = !checkIfAllSelectedAreComplete(
            rawTaskList,
            selectedTasks
        );
        for (let i = 0; i < taskIds.length; i++) {
            const obj = rawTaskList.find((el) => el.id === taskIds[i]);
            setEntryCompletion(obj, newCompletion);
        }
        selectedTaskChangeComplete();
    };

    const selectAllTasks = () => {
        if (checkIfAllTasksSelected(rawTaskList, selectedTasks))
            setSelectedTasks(getAllIds(rawTaskList));
        else setSelectedTasks([]);
    };

    const deleteSelectedTasks = (selectedTaskIds) => {
        fetchDeleteTasks(selectedTaskIds);
        selectedTaskChangeComplete();
    };

    const deletePopUp = (arrayOfIds, description) => {
        if (arrayOfIds.length)
            setPopUp(
                <ConfirmPopUp
                    message={`You are deleting ${description}. Are you sure you want to delete ${arrayOfIds.length} tasks?`}
                    confirm={() => deleteSelectedTasks(arrayOfIds)}
                    pressedKeys={pressedKeys}
                    setPopUp={setPopUp}
                />
            );
    };

    const getFilteredTaskIds = () => {
        const allIds = rawTaskList.map((el) => el.id);
        const keptIds = taskList.map((el) => el.id);
        return allIds.filter((el) => keptIds.indexOf(el) === -1);
    };

    const getColumnVisibilityMenus = () => {
        return fields.map((field) => {
            const newObj = Object.assign({}, visibleColumns);
            newObj[field] = !visibleColumns[field];
            return {
                name: field === 'id' ? 'ID' : capitalizeFirstLetter(field),
                action: () => setVisibleColumns(newObj),
                checkbox: visibleColumns[field]
            };
        });
    };

    const menus = [
        {
            name: 'File',
            sub: [
                {
                    name: 'New Tasks',
                    action: () =>
                        setPopUp(
                            <BatchNewTasks
                                setPopUp={setPopUp}
                                setDataChanged={setDataChanged}
                            />
                        )
                },
                {
                    name: 'Delete Tasks',
                    action: () =>
                        setPopUp(
                            <BatchDeleteTasks
                                pressedKeys={pressedKeys}
                                rawTaskList={rawTaskList}
                                setPopUp={setPopUp}
                                setDataChanged={setDataChanged}
                            />
                        )
                }
            ]
        },
        {
            name: 'Edit',
            sub: [
                {
                    name: `${
                        checkIfAllTasksSelected(rawTaskList, selectedTasks)
                            ? 'S'
                            : 'Des'
                    }elect All`,
                    action: () => selectAllTasks()
                },
                {
                    name: `Mark ${
                        checkIfAllSelectedAreComplete(
                            rawTaskList,
                            selectedTasks
                        )
                            ? 'Inc'
                            : 'C'
                    }omplete`,
                    action: () => {
                        if (selectedTasks.length)
                            setSelectedTaskCompletion(selectedTasks);
                    },
                    enabled: selectedTasks.length > 0
                },
                {
                    name: 'Change Value',
                    sub: fields
                        .filter((el) => el !== 'id' && el !== 'selected')
                        .map((field) => ({
                            name: capitalizeFirstLetter(field),
                            action: () =>
                                setPopUp(
                                    <ChangeValue
                                        field={field}
                                        setPopUp={setPopUp}
                                        pressedKeys={pressedKeys}
                                    />
                                )
                        })),
                    enabled: selectedTasks.length > 0
                },
                {
                    name: 'Delete',
                    sub: [
                        {
                            name: 'Delete Selected',
                            enabled: selectedTasks.length > 0,
                            action: () =>
                                deletePopUp(
                                    selectedTasks,
                                    'all selected entries'
                                )
                        },
                        {
                            name: 'Delete Filtered',
                            enabled: getFilteredTaskIds().length > 0,
                            action: () =>
                                deletePopUp(
                                    getFilteredTaskIds(),
                                    'all entries that do not pass the filter parameters'
                                )
                        }
                    ],
                    enabled: selectedTasks.length > 0
                },
                {
                    name: 'Preferences',
                    action: () =>
                        setPopUp(
                            <Preferences
                                setPopUp={setPopUp}
                                preferences={preferences}
                                setPreferences={setPreferences}
                            />
                        )
                }
            ]
        },
        {
            name: 'View',
            sub: [
                {
                    name: 'Taskbars',
                    sub: [
                        {
                            name: 'Floating',
                            action: () => setBarsFloating(!barsFloating),
                            checkbox: barsFloating
                        },
                        {
                            name: `${
                                Object.values(displayedBars).includes(true)
                                    ? 'Close'
                                    : 'Open'
                            } All`,
                            action: () => {
                                const boo = !Object.values(
                                    displayedBars
                                ).includes(true);
                                setDisplayedBars(displayBarsAll(boo));
                            }
                        },
                        {
                            name: `${
                                displayedBars.filter ? 'Hide' : 'Show'
                            } Filter`,
                            action: () =>
                                setDisplayedBars({
                                    ...displayedBars,
                                    filter: !displayedBars.filter
                                })
                        },
                        {
                            name: `${
                                displayedBars.createTask ? 'Hide' : 'Show'
                            } Create Task`,
                            action: () =>
                                setDisplayedBars({
                                    ...displayedBars,
                                    createTask: !displayedBars.createTask
                                })
                        },
                        {
                            name: `${
                                displayedBars.dataInfo ? 'Hide' : 'Show'
                            } Data Info`,
                            action: () =>
                                setDisplayedBars({
                                    ...displayedBars,
                                    dataInfo: !displayedBars.dataInfo
                                })
                        }
                    ]
                },
                {
                    name: 'Columns',
                    sub: [
                        {
                            name: 'Reset To Default',
                            action: () =>
                                setVisibleColumns(visibleColumnsDefault)
                        },
                        ...getColumnVisibilityMenus()
                    ]
                },
                {
                    name: `${displayBackground ? 'Hide' : 'Show'} Background`,
                    action: () => setDisplayBackground(!displayBackground)
                },
                {
                    name: `Use ${fixedStyle ? 'Scroll' : 'Fixed'} View`,
                    action: () => setFixedStyle(!fixedStyle)
                },
                {
                    name: `Color Theme`,
                    sub: themeColors.map((el) => ({
                        name: el.name,
                        action: () => setColorTheme(el.value),
                        boxColor: el.value
                    }))
                }
            ]
        },
        {
            name: 'Help',
            sub: [
                {
                    name: 'About',
                    action: () =>
                        setPopUp(
                            <MessagePopUp
                                message={[
                                    `Created by Samuel Morgan, 2020.`,
                                    `This app was created using React, Node & PostgreSQL.`,
                                    <a href="https://github.com/morgan-sam/Project-Management-Platform">
                                        Source Code
                                    </a>
                                ]}
                                pressedKeys={pressedKeys}
                                setPopUp={setPopUp}
                            />
                        )
                },
                {
                    name: 'Documentation',
                    action: () =>
                        window.open(
                            'https://github.com/morgan-sam/Project-Management-Platform#usage',
                            '_blank'
                        )
                }
            ]
        },
        {
            name: 'Account',
            sub: [
                {
                    name: 'Log Out',
                    action: () => app.auth().signOut()
                }
            ]
        }
    ];

    useEffect(() => {
        if (pressedKeys.includes('Delete'))
            deletePopUp(selectedTasks, 'all selected entries');
    }, [pressedKeys]);

    const navMenuStyle = {
        position: 'fixed',
        top: `-${BOX_BORDER_WIDTH_PX}px`,
        left: `-${BOX_BORDER_WIDTH_PX}px`
    };

    return <NavigationMenu style={navMenuStyle} menus={menus} />;
};

export default TaskManager;
