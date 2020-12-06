import React from 'react';
import styled from '@emotion/styled';

const TeamInputContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const TeamsList = styled.ul`
    height: 12rem;
    width: 12rem;
    overflow-x: hidden;
    overflow-y: scroll;
    margin: 0.5rem 0;
`;

const TeamsListItem = styled.li`
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.3rem;
`;

const TeamsListItemText = styled.span`
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
`;

const RemoveButton = styled.button`
    height: 1rem;
    width: 1rem;
    margin: 0 0.5rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
`;

const TeamTextInput = styled.input`
    padding: 0.5rem 0;
    margin-top: 1rem;
    width: 12rem;
    box-sizing: border-box;
`;

const TeamsArrayInput = (props) => {
    const { value, setValue } = props;

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') setValue((cur) => [...cur, e.target.value]);
    };

    return (
        <TeamInputContainer>
            <TeamsList>
                {value.map((item) => (
                    <TeamsListItem key={item}>
                        <TeamsListItemText>{item}</TeamsListItemText>
                        <RemoveButton
                            onClick={() =>
                                setValue((cur) =>
                                    cur.filter((val) => val !== item)
                                )
                            }
                        >
                            ❎
                        </RemoveButton>
                    </TeamsListItem>
                ))}
            </TeamsList>
            <TeamTextInput onKeyDown={handleKeyDown}></TeamTextInput>
        </TeamInputContainer>
    );
};

export default TeamsArrayInput;
