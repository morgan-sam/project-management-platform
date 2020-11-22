import React from 'react';
import styled from '@emotion/styled';

export const SpinnerContainer = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    height: 100vh;
    width: 100vw;
    align-items: center;
    justify-content: center;
`;

export const Spinner = styled.div`
    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
    height: 3rem;
    width: 3rem;
    border-top: 10px solid #4287f5;
    border-right: 10px solid #eee;
    border-bottom: 10px solid #eee;
    border-left: 10px solid #eee;
    border-radius: 100%;
    animation: spin 0.75s cubic-bezier(0.17, 0.67, 0.83, 0.67) infinite;
`;

const LoadingScreen = () => {
    return (
        <SpinnerContainer>
            <Spinner />
        </SpinnerContainer>
    );
};
export default LoadingScreen;
