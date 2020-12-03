import React, { useEffect, useState } from 'react';
import ColorButton from 'components/ColorButton';
import { capitalizeFirstLetter } from 'processing/utility';
import ChangeValuesInput from 'components/ChangeValues/ChangeValuesInput';

import {
    PopupTitle,
    PopUpContainer,
    PopUpWindow,
    SubContainer,
    FinalContainer,
    CancelButton
} from 'styling/popUp';

const getDefaultValue = (field) => {
    switch (field) {
        case 'task':
            return null;
        case 'date':
            return { day: 1, month: 12, year: 2020 };
        case 'deadline':
            return { day: 1, month: 12, year: 2020 };
        case 'urgency':
            return 3;
        case 'teams':
            return null;
        case 'completed':
            return null;
        default:
            return null;
    }
};

const ChangeValue = (props) => {
    const popUpCloseTimeMs = 400;
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
                            }, popUpCloseTimeMs);
                        }}
                    />
                </FinalContainer>
                <CancelButton onClick={() => setPopUp(null)}>×</CancelButton>
            </PopUpWindow>
        </PopUpContainer>
    );
};

export default ChangeValue;
