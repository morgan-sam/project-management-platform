import styled from '@emotion/styled';

export const PopupTitle = styled.h2`
    padding: 3rem;
    font-size: 1.6rem;
`;

export const PopUpContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    z-index: 20;
`;

export const PopUpWindow = styled.div`
    @keyframes batch-popup-fade-in {
        0% {
            opacity: 0;
            transform: translateY(1rem);
        }
        100% {
            opacity: 1;
            transform: translateY(0%);
        }
    }
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: fixed;
    border: 1px solid black;
    background-color: white;
    padding: 2rem;
    height: auto;
    width: auto;
    opacity: 0;
    z-index: 20;
    border-radius: 1rem;
    animation: batch-popup-fade-in 1s cubic-bezier(0.57, 0.82, 0.01, 0.82) 0.1s
        1 forwards;
`;

export const SubContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 4rem;
`;

export const CancelButton = styled.button`
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 0;
    height: 2rem;
    width: 2rem;
    top: 1rem;
    right: 1rem;
    background-color: salmon;
    color: white;
    font-size: 2rem;
    outline: none;
    cursor: pointer;
    border: 2px solid rgb(255, 140, 100);
`;

export const ErrorMatchText = styled.div`
    position: relative;
    top: 1rem;
    line-height: 0;
    color: #c12d29;
`;

export const TopRow = styled.div`
    display: flex;
    flex-direction: row;
`;

export const FinalContainer = styled.div`
    padding: 2.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const DateGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
    justify-content: center;
    align-items: center;
    margin-top: 2rem;
    z-index: 22;
`;

export const DateTopContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 2rem;
    align-items: center;
`;

export const DateRangeContainer = styled.div`
    display: flex;
    flex-direction: row;
    z-index: 21;
`;

export const DateContainer = styled.div`
    margin: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 20;
`;

export const DateLabel = styled.div`
    margin-bottom: 1rem;
`;

export const AutoContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin: 1rem;
`;
