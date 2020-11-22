import React, { useEffect } from 'react';
import ColorButton from 'components/ColorButton';

import {
    titleStyle,
    PopUpContainer,
    PopUpWindow,
    SubContainer,
    FinalContainer
} from 'styling/popUp';

const ConfirmPopUp = (props) => {
    const popUpCloseTimeMs = 400;
    const { message, setPopUp, pressedKeys } = props;
    const closePopUp = () => setPopUp(null);

    useEffect(() => {
        if (pressedKeys.includes('Escape')) closePopUp();
    }, [pressedKeys]);

    const paragraphStyle = {
        margin: '0.3rem'
    };

    const convertMessageArrayToElements = () => {
        if (Array.isArray(message))
            return message.map((content, i) => (
                <p key={i} style={paragraphStyle}>
                    {content}
                </p>
            ));
        else return <p style={paragraphStyle}>{message}</p>;
    };

    return (
        <PopUpContainer>
            <PopUpWindow>
                <h2 style={titleStyle}>About</h2>
                <SubContainer>{convertMessageArrayToElements()}</SubContainer>
                <FinalContainer>
                    <ColorButton
                        text={'Close'}
                        onClick={async () => {
                            setTimeout(() => {
                                closePopUp();
                            }, popUpCloseTimeMs);
                        }}
                    />
                </FinalContainer>
            </PopUpWindow>
        </PopUpContainer>
    );
};

export default ConfirmPopUp;
