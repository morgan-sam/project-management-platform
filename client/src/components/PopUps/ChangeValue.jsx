import React, { useEffect } from 'react';
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

const ChangeValue = (props) => {
    const popUpCloseTimeMs = 400;
    const { setPopUp, pressedKeys, field } = props;
    const closePopUp = () => setPopUp(null);

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
                    <ChangeValuesInput {...{ field }}></ChangeValuesInput>
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
