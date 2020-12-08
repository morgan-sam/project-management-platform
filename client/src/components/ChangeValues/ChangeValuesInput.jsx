import React from 'react';
import DateSelect from 'components/DateSelect';
import DropdownWithLabel from 'components/DropdownWithLabel';
import styled from '@emotion/styled';
import TeamsArrayInput from 'components/ChangeValues/TeamsArrayInput';
import Checkbox from 'components/Checkbox';
import { DateISOToObject, DateObjectToISO } from 'data/dates';

// Task

const InputContainer = styled.div`
    padding: 0.5rem;
    display: flex;
    flex-direction: column;
`;
const TaskTextInput = styled.input`
    padding: 0.5rem;
    text-indent: 3px;
    margin-top: 0.75rem;
`;

// Completed

const CheckboxContainer = styled.div`
    padding: 0.5rem;
    display: flex;
    & > * {
        margin: 0.5rem;
    }
`;

const ChangeValuesInput = (props) => {
    const { field, value, setValue } = props;
    switch (field) {
        case 'task':
            // text input
            return (
                <InputContainer>
                    <span>Input new task name:</span>
                    <TaskTextInput
                        value={value}
                        onChange={(e) => setValue(e.currentTarget.value)}
                        type="text"
                    />
                </InputContainer>
            );
        case 'date':
        case 'deadline':
            // date input
            return (
                <DateSelect
                    date={DateISOToObject(value)}
                    setDate={(date) => setValue(DateObjectToISO(date))}
                />
            );
        case 'urgency':
            // integer input
            return (
                <DropdownWithLabel
                    width={2}
                    label={'Urgency'}
                    selected={value}
                    options={[1, 2, 3, 4, 5]}
                    onClick={setValue}
                />
            );
        case 'teams':
            // array input
            return <TeamsArrayInput {...{ value, setValue }} />;
        case 'completed':
            // boolean input
            return (
                <CheckboxContainer>
                    <span>Completed: </span>
                    <Checkbox
                        default={value}
                        onChange={() => setValue(!value)}
                    />
                </CheckboxContainer>
            );
        default:
            return <div>ERROR</div>;
    }
};

export default ChangeValuesInput;
