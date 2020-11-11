import styled from '@emotion/styled';

export const LoginTitle = styled.h1`
    margin: 1rem;
    font-size: 2rem;
    text-decoration: underline;
    color: ${(props) => props.theme.colors.primary};
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
    background: linear-gradient(
        90deg,
        rgba(218, 183, 255, 1) 0%,
        rgba(159, 138, 255, 1) 100%
    );

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
