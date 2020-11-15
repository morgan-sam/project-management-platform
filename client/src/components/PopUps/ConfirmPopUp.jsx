import React, { useEffect } from 'react';
import ColorButton from 'components/ColorButton';
import {
    PopUpContainerElement,
    ConfirmButtonContainer,
    buttonStyle,
    ConfirmMessageContainer
} from 'styling/confirmPopUp';

const ConfirmPopUp = (props) => {
    const popUpCloseTimeMs = 400;
    const { message, cancel, confirm, setPopUp, pressedKeys } = props;
    const closePopUp = () => setPopUp(null);

    useEffect(() => {
        if (pressedKeys.includes('Escape')) {
            if (cancel) cancel();
            else closePopUp();
        }
        if (pressedKeys.includes('Enter')) {
            closePopUp();
            confirm();
        }
    }, [pressedKeys]);

    return (
        <PopUpContainerElement>
            <ConfirmMessageContainer>
                <h3>{message}</h3>
            </ConfirmMessageContainer>
            <ConfirmButtonContainer>
                <ColorButton
                    color={'green'}
                    style={buttonStyle}
                    text={'Confirm'}
                    onClick={async () => {
                        setTimeout(() => {
                            closePopUp();
                            confirm();
                        }, popUpCloseTimeMs);
                    }}
                />
                <ColorButton
                    color={'darkred'}
                    style={buttonStyle}
                    text={'Cancel'}
                    onClick={() =>
                        setTimeout(() => {
                            if (cancel) cancel();
                            else closePopUp();
                        }, popUpCloseTimeMs)
                    }
                />
            </ConfirmButtonContainer>
        </PopUpContainerElement>
    );
};

export default ConfirmPopUp;
