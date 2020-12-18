import React, { useEffect } from 'react';
import ColorButton from 'components/ColorButton';
import {
    PopUpContainerElement,
    ConfirmButtonContainer,
    ConfirmMessageContainer
} from 'styling/confirmPopUp';

const ConfirmPopUp = (props) => {
    const POPUP_CLOSE_TIME_MS = 400;
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
                    text={'Confirm'}
                    onClick={async () => {
                        setTimeout(() => {
                            closePopUp();
                            confirm();
                        }, POPUP_CLOSE_TIME_MS);
                    }}
                />
                <ColorButton
                    color={'darkred'}
                    text={'Cancel'}
                    onClick={() =>
                        setTimeout(() => {
                            if (cancel) cancel();
                            else closePopUp();
                        }, POPUP_CLOSE_TIME_MS)
                    }
                />
            </ConfirmButtonContainer>
        </PopUpContainerElement>
    );
};

export default ConfirmPopUp;
