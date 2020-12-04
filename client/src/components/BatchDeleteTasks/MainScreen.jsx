import React from 'react';
import {
    PopupTitle,
    PopUpWindow,
    CancelButton,
    ErrorMatchText,
    FinalContainer,
    DateTopContainer,
    DateGrid,
    DateRangeContainer,
    DateContainer,
    DateLabel,
    AutoContainer
} from 'styling/popUp';
import ColorButton from 'components/ColorButton';
import MatchType from 'components/MatchType';
import InputFormWithLabel from 'components/InputFormWithLabel';
import DateSelect from 'components/DateSelect';
import UrgencyRangeSelect from 'components/UrgencyRangeSelect';
import Dropdown from 'components/Dropdown';
import CompletionSelect from 'components/CompletionSelect';
import { parseISOToDateObj, parseDateObjToISO } from 'processing/dates';
import { formatTeamsDropdownSelect } from 'processing/teams';
import { getTaskListTeams } from 'processing/teams';
import { getDefaultDeleteTemplate } from 'data/defaultState';
import styled from '@emotion/styled';

const CompletionSelectContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const BatchDeleteTasks = (props) => {
    const {
        setPopUp,
        rawTaskList,
        setScreen,
        finalMatched,
        template,
        setTemplate,
        matched
    } = props;
    return (
        <PopUpWindow>
            <PopupTitle>Batch Delete Tasks</PopupTitle>
            <DateGrid>
                <InputFormWithLabel
                    label={'Task Regex'}
                    onChange={(val) => setTemplate({ ...template, task: val })}
                    default={template.task}
                />
                <CompletionSelectContainer>
                    <CompletionSelect
                        {...props}
                        state={[template, setTemplate]}
                    />
                </CompletionSelectContainer>
                <div
                    style={{
                        color: 'rgb(193, 45, 41)',
                        fontSize: '0.8rem',
                        height: '1rem',
                        textAlign: 'center'
                    }}
                >
                    {typeof matched.task === 'string'
                        ? matched.task
                        : matched.task.length === rawTaskList.length
                        ? ''
                        : `${matched.task.length}/${rawTaskList.length} Name Matches`}
                </div>
                <div
                    style={{
                        color: 'rgb(193, 45, 41)',
                        fontSize: '0.8rem',
                        height: '1rem',
                        textAlign: 'center'
                    }}
                >
                    {template.completion.includes('all')
                        ? ''
                        : `${matched.completion.length}/${rawTaskList.length} Completion Matches`}
                </div>
            </DateGrid>
            <DateTopContainer>
                <DateRangeContainer>
                    <DateContainer>
                        <DateLabel>Date:</DateLabel>
                        <DateSelect
                            style={{ zIndex: '20' }}
                            date={parseISOToDateObj(template.date)}
                            setDate={(val) =>
                                setTemplate({
                                    ...template,
                                    date: parseDateObjToISO(val)
                                })
                            }
                        />
                        <ColorButton
                            text={'Reset To First Date'}
                            onClick={() =>
                                setTemplate({
                                    ...template,
                                    date: getDefaultDeleteTemplate(rawTaskList)
                                        .date
                                })
                            }
                        />
                    </DateContainer>
                    <DateContainer>
                        <DateLabel>Deadline:</DateLabel>
                        <DateSelect
                            style={{ zIndex: '20' }}
                            date={parseISOToDateObj(template.deadline)}
                            setDate={(val) => {
                                setTemplate({
                                    ...template,
                                    deadline: parseDateObjToISO(val)
                                });
                            }}
                        />
                        <ColorButton
                            text={'Reset To Last Deadline'}
                            onClick={() =>
                                setTemplate({
                                    ...template,
                                    deadline: getDefaultDeleteTemplate(
                                        rawTaskList
                                    ).deadline
                                })
                            }
                        />
                    </DateContainer>
                </DateRangeContainer>
                <ErrorMatchText>
                    {matched.dateRange.length === rawTaskList.length
                        ? ''
                        : `${matched.dateRange.length}/${rawTaskList.length} Date Range Matches`}
                </ErrorMatchText>
            </DateTopContainer>
            <div style={{ display: 'flex' }}>
                <AutoContainer>
                    <UrgencyRangeSelect
                        style={{
                            display: 'flex',
                            zIndex: '20',
                            padding: '1rem'
                        }}
                        urgency={template.urgency}
                        onChange={(min, max) =>
                            setTemplate({ ...template, urgency: { min, max } })
                        }
                    />
                    <ErrorMatchText>
                        {matched.urgency.length === rawTaskList.length
                            ? ''
                            : `${matched.urgency.length}/${rawTaskList.length} Urgency Matches`}
                    </ErrorMatchText>
                </AutoContainer>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Dropdown
                        width={8}
                        type={'checkbox'}
                        label={'Teams'}
                        onClick={(val) => {
                            setTemplate({
                                ...template,
                                teams: formatTeamsDropdownSelect(val, template)
                            });
                        }}
                        options={getTaskListTeams(rawTaskList)}
                        filterOptions={template}
                        selected={template.teams}
                        style={{ zIndex: '18', margin: '1rem' }}
                    />
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: '8rem'
                        }}
                    >
                        <MatchType
                            default={template.teamMatch}
                            onChange={(val) =>
                                setTemplate({ ...template, teamMatch: val })
                            }
                        />
                        <div
                            style={{
                                color: 'rgb(193, 45, 41)',
                                fontSize: '0.8rem',
                                height: '1rem'
                            }}
                        >
                            {template.teams.includes('all')
                                ? ''
                                : `${matched.teams.length}/${rawTaskList.length} Team Matches`}
                        </div>
                    </div>
                </div>
            </div>
            <FinalContainer>
                <ColorButton
                    color={'#32CD32'}
                    text={`Reset Template To Default`}
                    onClick={() =>
                        setTemplate(getDefaultDeleteTemplate(rawTaskList))
                    }
                />
                <ColorButton
                    color={'#32CD32'}
                    text={
                        finalMatched.length === rawTaskList.length
                            ? `All Tasks Matched`
                            : finalMatched.length === 0
                            ? `No Tasks Matched`
                            : `Check Matched Tasks`
                    }
                    enabled={
                        finalMatched.length !== rawTaskList.length &&
                        finalMatched.length !== 0
                    }
                    onClick={() => setScreen('matched')}
                />
                <ColorButton
                    color={'#a00'}
                    text={
                        finalMatched.length === 0
                            ? `No Tasks Matched`
                            : `Delete ${finalMatched.length} Tasks`
                    }
                    onClick={() => setScreen('confirm')}
                    enabled={finalMatched.length !== 0}
                />
            </FinalContainer>
            <CancelButton onClick={() => setPopUp(null)}>×</CancelButton>
        </PopUpWindow>
    );
};

export default BatchDeleteTasks;
