import React from 'react';
import styled from '@emotion/styled';

const TeamInputContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const TeamTextInput = styled.input`
    padding: 0.5rem;
`;

const TeamsList = styled.ul`
    height: 5rem;
    overflow-y: scroll;
    margin: 0.5rem 0;
`;

const TeamsArrayInput = (props) => {
    const { value, setValue } = props;

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') setValue((cur) => [...cur, e.target.value]);
    };

    return (
        <TeamInputContainer>
            <TeamsList>
                {value.map((el) => (
                    <li key={el}>{el}</li>
                ))}
            </TeamsList>
            <TeamTextInput onKeyDown={handleKeyDown}></TeamTextInput>
        </TeamInputContainer>
    );
};

export default TeamsArrayInput;
