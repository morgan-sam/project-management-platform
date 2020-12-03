import React from 'react';

const ChangeValuesInput = (props) => {
    const { field } = props;

    switch (field) {
        case 'task':
            // text input
            return <div>text input</div>;
            break;
        case 'date':
        case 'deadline':
            // date input
            return <div>date input</div>;
            break;
        case 'urgency':
            // integer input
            return <div>integer input</div>;
            break;
        case 'teams':
            // array input
            return <div>array input</div>;
            break;
        case 'completed':
            // boolean input
            return <div>boolean input</div>;
            break;
        default:
            return <div>ERROR</div>;
    }
};

export default ChangeValuesInput;
