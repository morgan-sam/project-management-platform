import React from 'react';
import DateSelect from 'components/DateSelect';
import Dropdown from 'components/Dropdown';
import LoadingScreen from 'components/Screens/LoadingScreen';

const ChangeValuesInput = (props) => {
    const { field, value, setValue } = props;
    console.log(value);
    switch (field) {
        case 'task':
            // text input
            return <div>text input</div>;
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
