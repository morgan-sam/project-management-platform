import React from 'react';
import DateSelect from 'components/DateSelect';

const ChangeValuesInput = (props) => {
    const { field, value, setValue } = props;

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
            return <div>integer input</div>;
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
