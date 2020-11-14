import React, { useState, useContext } from 'react';
import ThemeContext from 'context/ThemeContext';
import styled from '@emotion/styled';

const WizardButton = (props) => {
    const [hover, setHover] = useState(false);
    const themeColor = useContext(ThemeContext);

    const WizardBtn = styled.button`
        display: flex;
        justify-content: center;
        align-items: center;
        width: 1.3rem;
        height: 1.3rem;
        border: 1px solid black;
        user-select: none;
        cursor: pointer;
        color: ${hover ? 'white' : 'black'};
        background-color: ${hover ? themeColor : 'white'};
    `;

    return (
        <WizardBtn
            onClick={(val) => props.onClick(val)}
            onMouseOver={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <span role="img" aria-label="lightning">
                ⚡
            </span>
        </WizardBtn>
    );
};

export default WizardButton;
