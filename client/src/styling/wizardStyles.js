import styled from '@emotion/styled';

export const FourByFourGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
    & > * {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        padding: 1rem;
        text-align: center;
    }
    & > *:nth-child(1) {
        grid-area: 1 / 1 / 2 / 2;
    }
    & > *:nth-child(2) {
        grid-area: 2 / 1 / 3 / 2;
    }
    & > *:nth-child(3) {
        grid-area: 1 / 2 / 2 / 3;
    }
    & > *:nth-child(4) {
        grid-area: 2 / 2 / 3 / 3;
    }
`;

export const DisabledContainer = styled.div`
    opacity: ${(props) => (props.disabled ? '0.3' : '1')};
    pointer-events: ${(props) => (props.disabled ? 'none' : 'auto')};
`;

export const WizardTitle = styled.h3`
    margin: 2rem 0rem;
    font-size: 1.2rem;
`;

export const BottomContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2rem;
    margin: 1.5rem 0rem;
`;

export const containerItemStyle = {
    padding: '1rem'
};

export const Grid = styled.div`
    display: grid;
    grid-template-rows: repeat(${(props) => props.rows}, 1fr);
    grid-template-columns: repeat(${(props) => props.columns}, 1fr);
    grid-gap: 1rem;
    padding: 1rem;
`;
