import styled from '@emotion/styled';

export const LoginTitle = styled.h1`
    margin: 1rem;
    font-size: 2rem;
    text-decoration: underline;
`;

export const AccountScreen = styled.div`
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const AccountEntryBox = styled.div`
    width: fit-content;
    padding: 2rem;
    border: 2px solid black;
    border-radius: 1rem;
    fontsize: 1.7rem;
    color: black;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
`;

export const LoginSignupFooter = styled.div`
    padding: 1rem;
    font-size: 1rem;
`;

export const Instruction = styled.li`
    padding: 0.7rem;
    font-size: 1rem;
`;

export const InstructionsContainer = styled.ul`
    display: flex;
    flex-direction: column;
    margin: 1rem;
`;
