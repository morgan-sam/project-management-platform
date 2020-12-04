import React from 'react';
import DateSelect from 'components/DateSelect';
import Dropdown from 'components/Dropdown';
import LoadingScreen from 'components/Screens/LoadingScreen';
import styled from '@emotion/styled';

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

const ChangeValuesInput = (props) => {
    const { field, value, setValue } = props;
    console.log(value);
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
                <Dropdown
                    selected={value}
                    options={[1, 2, 3, 4, 5]}
                    onClick={setValue}
                />
            );
        case 'teams':
            // array input
            return <div>array input</div>;
        case 'completed':
            // boolean input
            return <div>boolean input</div>;
        default:
            return <div>ERROR</div>;
    }
};

export default ChangeValuesInput;
