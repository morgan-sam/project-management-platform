import React, { useContext } from 'react';
import { MainTitleContainer, MainTitleText } from 'styling/mainTitle';
import ThemeContext from 'context/ThemeContext';

const MainTitle = (props) => {
    const themeColor = useContext(ThemeContext);
    return (
        <MainTitleContainer>
            <MainTitleText themeColor={themeColor}>
                PROJECT MANAGEMENT PLATFORM
            </MainTitleText>
        </MainTitleContainer>
    );
};

export default MainTitle;
