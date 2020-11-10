import React, { useState } from 'react';
import MainScreen from 'components/BatchNewTasks/MainScreen';
import DateTemplateWizard from 'components/BatchNewTasks/DateTemplateWizard';
import TaskTemplateWizard from 'components/BatchNewTasks/TaskTemplateWizard';
import { interpretDateTemplate } from 'processing/dateTemplate';
import { interpretTaskTemplate } from 'processing/taskTemplate';
import { fetchPostEntry } from 'data/fetch';
import { parseDateObjToISO } from 'processing/dates';
import { defaultBatchNewTasksTemplate } from 'data/defaultState';
import { topContainerStyle } from 'styling/popUp';

const BatchNewTasks = (props) => {
    const { setDataChanged, setPopUp } = props;
    const [errors, setErrors] = useState({ task: '', date: '', deadline: '' });
    const [template, setTemplate] = useState(defaultBatchNewTasksTemplate);
    const [screen, setScreen] = useState('main');

    const getTaskEntry = (strings, i) => {
        const { task, date, deadline } = strings;
        return {
            task: task[i],
            date: parseDateObjToISO(date[i]),
            deadline: parseDateObjToISO(deadline[i]),
            urgency: template.urgency,
            teams: template.teams.filter((el) => el !== ''),
            completed: false
        };
    };

    const checkForTemplateErrors = (strings) => {
        const { task, date, deadline } = strings;
        return {
            ...(typeof task === 'string' ? { task } : null),
            ...(typeof date === 'string' ? { date } : null),
            ...(typeof deadline === 'string' ? { deadline } : null)
        };
    };

    const getEntryStrings = () => {
        return {
            task: interpretTaskTemplate(template.task, template.count),
            date: interpretDateTemplate(template.date, template.count),
            deadline: interpretDateTemplate(template.deadline, template.count)
        };
    };

    const addMultipleTasks = () => {
        let strings = getEntryStrings();
        let errors = checkForTemplateErrors(strings);
        if (Object.values(errors).length === 0) {
            for (let i = 0; i < template.count; i++) {
                const entry = getTaskEntry(strings, i);
                fetchPostEntry(entry);
                setDataChanged(true);
                setPopUp(null);
            }
        } else setErrors(errors);
    };

    return (
        <div style={topContainerStyle}>
            {screen === 'main' && (
                <MainScreen
                    errors={errors}
                    setErrors={setErrors}
                    template={template}
                    setTemplate={setTemplate}
                    addMultipleTasks={addMultipleTasks}
                    setPopUp={setPopUp}
                    setScreen={setScreen}
                />
            )}
            {(screen === 'dateWizard' || screen === 'deadlineWizard') && (
                <DateTemplateWizard
                    setScreen={setScreen}
                    template={template}
                    setTemplate={setTemplate}
                    screen={screen}
                />
            )}
            {screen === 'taskWizard' && (
                <TaskTemplateWizard
                    setScreen={setScreen}
                    template={template}
                    setTemplate={setTemplate}
                />
            )}
        </div>
    );
};

export default BatchNewTasks;

// Task Template Options:

// '${n, 1/2/3/#, a/d}
// 'Number template:
// 'mainflag, Minimum digits, ascending/descending'

// '${l, a/d}
// 'Letter template:
// 'mainflag, ascending/descending'

// Examples:
// BackendTest_${n} => (BackendTest_1,BackendTest_2,BackendTest_3)
// FrontendTest_${n-1,3} => (FrontendTest_000,FrontendTest_001,FrontendTest_002)
// feature_${l,d} => (feature_z,feature_y,feature_x)

///////////////////////////////////////////////////////////////////////////////////////////////
