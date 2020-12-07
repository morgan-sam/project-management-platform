import React, { useEffect, useState } from 'react';
import ColorButton from 'components/ColorButton';
import { capitalizeFirstLetter } from 'processing/utility';
import ChangeValuesInput from 'components/ChangeValues/ChangeValuesInput';
import { todaysDateAsObject } from 'data/dates';

import {
    PopupTitle,
    PopUpContainer,
    PopUpWindow,
    SubContainer,
    FinalContainer,
    CancelButton
} from 'styling/popUp';

const POP_UP_CLOSE_TIME_MS = 400;

const getDefaultValue = (field) => {
    switch (field) {
        case 'task':
            return '';
        case 'date':
        case 'deadline':
            return todaysDateAsObject();
        case 'urgency':
            return 3;
        case 'teams':
            return [];
        case 'completed':
            return false;
        default:
            return null;
    }
};

const ChangeValue = (props) => {
    const { setPopUp, pressedKeys, field } = props;
    const closePopUp = () => setPopUp(null);

    const [value, setValue] = useState(getDefaultValue(field));

    useEffect(() => {
        if (pressedKeys.includes('Escape')) closePopUp();
    }, [pressedKeys]);

    return (
        <PopUpContainer>
            <PopUpWindow>
                <PopupTitle>
                    Change {capitalizeFirstLetter(field)} Values
                </PopupTitle>
                <SubContainer>
                    <ChangeValuesInput {...{ field, value, setValue }} />
                </SubContainer>
                <FinalContainer>
                    <ColorButton
                        text={'Change all values'}
                        onClick={async () => {
                            setTimeout(() => {
                                closePopUp();
                            }, POP_UP_CLOSE_TIME_MS);
                        }}
                    />
                </FinalContainer>
                <CancelButton onClick={() => setPopUp(null)}>×</CancelButton>
            </PopUpWindow>
        </PopUpContainer>
    );
};

export default ChangeValue;
