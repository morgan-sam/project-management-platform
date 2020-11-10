import React, { useState, useEffect } from 'react';
import MainScreen from 'components/BatchDeleteTasks/MainScreen';
import ViewMatchedTasks from 'components/BatchDeleteTasks/ViewMatchedTasks';
import ConfirmPopUp from 'components/PopUps/ConfirmPopUp';
import { topContainerStyle } from 'styling/popUp';
import {
    filterListDate,
    filterListDeadline,
    filterListMinUrgency,
    filterListMaxUrgency,
    filterListTeams,
    filterListCompletion
} from 'processing/filterList';
import { fetchDeleteTasks } from 'data/fetch';
import { getCommonElements } from 'processing/utility';
import { getDefaultDeleteTemplate } from 'data/defaultState';

const BatchDeleteTasks = (props) => {
    const { setDataChanged, setPopUp, rawTaskList, pressedKeys } = props;
    const [screen, setScreen] = useState('main');
    const [finalMatched, setFinalMatched] = useState([]);
    const [template, setTemplate] = useState(
        getDefaultDeleteTemplate(rawTaskList)
    );
    const [matched, setMatched] = useState({
        task: [],
        completion: [],
        dateRange: [],
        urgency: [],
        teams: []
    });

    useEffect(() => {
        const taskMatchIDs = getTaskMatchIDs(template.task);
        const completionMatchIDs = filterListCompletion(
            template,
            rawTaskList
        ).map((el) => el.id);
        const dateRangeMatchIDs = getDateRangeMatchIDs(template);
        const urgencyMatchIDs = getUrgencyMatchIDs(template);
        const teamMatchIDs = filterListTeams(template, rawTaskList).map(
            (el) => el.id
        );
        setMatched({
            task: taskMatchIDs,
            completion: completionMatchIDs,
            dateRange: dateRangeMatchIDs,
            urgency: urgencyMatchIDs,
            teams: teamMatchIDs
        });
    }, [template]);

    useEffect(() => {
        const matches = Object.values(matched);
        if (matches.some((el) => typeof el === 'string')) setFinalMatched([]);
        else {
            const commonMatches = matches.reduce((common, category) =>
                getCommonElements(common, category)
            );
            setFinalMatched(commonMatches);
        }
    }, [matched]);

    const deletedMatchedTasks = () => {
        fetchDeleteTasks(finalMatched);
        setDataChanged(true);
        setPopUp(null);
    };

    const getTaskMatchIDs = (regex) => {
        try {
            const reg = new RegExp(regex);
            const filtered = props.rawTaskList.filter((el) => {
                return el.task.match(reg);
            });
            return filtered.map((el) => el.id);
        } catch (error) {
            return 'Invalid Regex';
        }
    };

    const getDateRangeMatchIDs = (template) => {
        const datesMatchIDs = filterListDate(template, rawTaskList).map(
            (el) => el.id
        );
        const deadlinesMatchIDs = filterListDeadline(template, rawTaskList).map(
            (el) => el.id
        );
        return getCommonElements(datesMatchIDs, deadlinesMatchIDs);
    };

    const getUrgencyMatchIDs = (template) => {
        const minMatchIDs = filterListMinUrgency(template, rawTaskList).map(
            (el) => el.id
        );
        const maxMatchIDs = filterListMaxUrgency(template, rawTaskList).map(
            (el) => el.id
        );
        return getCommonElements(minMatchIDs, maxMatchIDs);
    };

    return (
        <div style={topContainerStyle}>
            {screen === 'main' && (
                <MainScreen
                    {...props}
                    {...{
                        finalMatched,
                        setFinalMatched,
                        setScreen,
                        template,
                        setTemplate,
                        matched
                    }}
                />
            )}
            {screen === 'matched' && (
                <ViewMatchedTasks {...props} {...{ finalMatched, setScreen }} />
            )}
            {screen === 'confirm' && (
                <ConfirmPopUp
                    message={`Are you sure you want to delete ${finalMatched.length} tasks?`}
                    confirm={() => deletedMatchedTasks()}
                    cancel={() => setScreen('main')}
                    pressedKeys={pressedKeys}
                    setPopUp={setPopUp}
                />
            )}
        </div>
    );
};

export default BatchDeleteTasks;
