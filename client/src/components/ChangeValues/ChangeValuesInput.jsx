import React from 'react';

const ChangeValuesInput = (props) => {
    const { field } = props;

    switch (field) {
        case 'task':
            // text input
            return <div>text input</div>;
        case 'date':
        case 'deadline':
            // date input
            return <div>date input</div>;
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
