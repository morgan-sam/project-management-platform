import styled from '@emotion/styled';

export const Instruction = styled.li`
    padding: 0.7rem;
    font-size: 1rem;
    color: ${(props) => props.theme.colors.primary};
`;

export const InstructionsContainer = styled.ul`
    display: flex;
    flex-direction: column;
    margin: 1rem;
`;

export const RemoveButton = styled.button`
    width: 1rem;
    height: 1rem;
    fontsize: 1rem;
    border: 1px solid black;
    background-color: #ffb2b2;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 1rem;
    cursor: pointer;
    user-select: none;
`;

export const PageThreeInterfaceContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0.75rem;
`;

export const listStyle = {
    maxHeight: '20rem',
    overflowY: 'scroll',
    margin: '0.5rem'
};

export const listLineStyle = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    margin: '1rem'
};

export const noTeamMembersStyle = {
    fontSize: '0.8rem',
    margin: '1rem'
};

export const pageThreeTitleStyle = {
    textDecoration: 'underline',
    margin: '1rem'
};

export const pageFourSubSectionStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '1rem'
};

export const pageFourListStyle = {
    fontSize: '1rem',
    flexDirection: 'column',
    maxHeight: '10rem',
    overflowY: 'scroll'
};

export const pageFourListLineStyle = {
    display: 'flex',
    justifyContent: 'center',
    margin: '0 1rem'
};

export const pageFourConfirmButtonStyle = {
    margin: '1rem'
};
