import React, { useState } from 'react';
import ColorButton from 'components/ColorButton';
import DateRangeSelect from 'components/DateRangeSelect';
import DropdownWithLabel from 'components/DropdownWithLabel';
import InputFormWithLabel from 'components/InputFormWithLabel';
import {
    getTaskBarHiddenStyle,
    getTaskBarVisibleStyle,
    Taskbar
} from 'styling/taskBars';
import { parseISOToDateObj } from 'processing/dates';
import { fetchPostEntry } from 'data/fetch';
import { getDayFromTodayAsISO } from 'data/dates';
import Checkbox from 'components/Checkbox';

const CreateTaskBar = (props) => {
    const { style, displayedBars, setDataChanged, setDisplayedBars } = props;
    const [overflowHidden, setOverflowHidden] = useState(true);
    const [popUpOpen, setPopUpOpen] = useState(false);
    const [input, setInput] = useState({
        task: null,
        date: getDayFromTodayAsISO(0),
        deadline: getDayFromTodayAsISO(14),
        urgency: 3,
        teams: null
    });
    const [keepOpen, setKeepOpen] = useState(false);

    const teams = input.teams
        ? input.teams.split(' ').filter((el) => el !== '')
        : [];
    const task = input.task ? input.task.trim() : '';

    const addTaskToDatabase = () => {
        if (task && teams.length) {
            const entry = { ...input, task, teams, completed: 'false' };
            fetchPostEntry(entry);
            setDataChanged(true);
            if (!keepOpen)
                setTimeout(
                    () =>
                        setDisplayedBars({
                            ...displayedBars,
                            createTask: false
                        }),
                    500
                );
        }
    };

    return (
        <Taskbar
            className="createTaskBar"
            style={{
                ...style,
                ...(displayedBars.createTask
                    ? getTaskBarVisibleStyle(popUpOpen)
                    : getTaskBarHiddenStyle(popUpOpen)),
                overflow: overflowHidden ? 'visible' : 'hidden'
            }}
        >
            <InputFormWithLabel
                {...props}
                label={'Task'}
                onChange={(val) => setInput({ ...input, task: val })}
            />
            <DateRangeSelect
                {...props}
                date={parseISOToDateObj(input.date)}
                deadline={parseISOToDateObj(input.deadline)}
                setDate={(val) => setInput({ ...input, date: val })}
                setDeadline={(val) => setInput({ ...input, deadline: val })}
                setOverflowHidden={setOverflowHidden}
                setPopUpOpen={setPopUpOpen}
            />
            <DropdownWithLabel
                {...props}
                width={'2rem'}
                label={'Urgency'}
                selected={input.urgency}
                options={[1, 2, 3, 4, 5]}
                onClick={(val) => setInput({ ...input, urgency: val })}
                setOverflowHidden={setOverflowHidden}
            />
            <InputFormWithLabel
                {...props}
                label={'Teams'}
                onChange={(val) => setInput({ ...input, teams: val })}
            />
            <ColorButton
                text={`Add Task To Database`}
                onClick={addTaskToDatabase}
                enabled={task && teams.length}
            />
            <div style={{ margin: '0 0 0 2rem', width: '8rem' }}>
                Keep Open:
            </div>
            <Checkbox
                type="checkbox"
                className="inputCheckbox"
                style={{ borderRadius: '100%', margin: '0 2rem 0 0' }}
                onChange={() => setKeepOpen(!keepOpen)}
                default={keepOpen}
            />
        </Taskbar>
    );
};

export default CreateTaskBar;
