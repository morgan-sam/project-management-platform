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

const TeamsListItem = styled.li`
    display: flex;
    justify-content: space-between;
`;

const RemoveButton = styled.button`
    height: 1rem;
    width: 1rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
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
                        <span>{item}</span>
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
