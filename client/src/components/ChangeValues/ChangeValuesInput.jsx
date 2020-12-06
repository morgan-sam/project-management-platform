import React from 'react';
import DateSelect from 'components/DateSelect';
import DropdownWithLabel from 'components/DropdownWithLabel';
import styled from '@emotion/styled';
import TeamsArrayInput from 'components/ChangeValues/TeamsArrayInput';
import Checkbox from 'components/Checkbox';

// Task

const InputContainer = styled.div`
    padding: 0.5rem;
    display: flex;
    flex-direction: column;
`;
const InputLabel = styled.span`
    padding: 0.75rem 0;
`;
const TaskTextInput = styled.input`
    padding: 0.5rem;
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
                    <InputLabel>Input new task name:</InputLabel>
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
            return <DateSelect date={value} setDate={setValue} />;
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
