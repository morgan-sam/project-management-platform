import styled from '@emotion/styled';

export const PopUpContainerElement = styled.div`
    @keyframes fade-in {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: fixed;
    top: 50vh;
    left: 50vw;
    height: 12rem;
    width: 23rem;
    border: 1px solid black;
    transform: translate(-50%, -50%);
    background-color: white;
    z-index: 20;
    animation: fade-in 1s;
`;

export const buttonContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '1rem'
};

export const buttonStyle = {
    width: '5rem',
    height: '2rem',
    lineHeight: '0'
};

export const messageContainerStyle = {
    width: '75%',
    textAlign: 'center',
    lineHeight: '1.5rem',
    margin: '2rem 0 0 0'
};
