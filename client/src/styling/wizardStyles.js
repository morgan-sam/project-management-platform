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

export const getSectionOpacityStyle = (disabled) => {
    return {
        opacity: disabled ? '0.3' : '1',
        pointerEvents: disabled ? 'none' : 'auto'
    };
};

export const WizardTitle = styled.h3`
    margin: 2rem 0rem;
    font-size: 1.2rem;
`;

export const bottomContainer = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2rem',
    margin: '1.5rem 0rem'
};

export const containerItemStyle = {
    padding: '1rem'
};

export const getSubGridStyle = (columns, rows) => {
    return {
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
        gridGap: '1rem',
        padding: '1rem'
    };
};
