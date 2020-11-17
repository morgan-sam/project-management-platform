import styled from '@emotion/styled';

export const titleStyle = {
    padding: '3rem',
    fontSize: '1.6rem'
};

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

export const popUpWindowStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    position: 'fixed',
    border: '1px solid black',
    backgroundColor: 'white',
    padding: '2rem',
    height: 'auto',
    width: 'auto',
    opacity: '0',
    zIndex: '20',
    borderRadius: '1rem',
    animation:
        'batch-popup-fade-in 1s cubic-bezier(.57,.82,.01,.82) 0.1s 1 forwards'
};

export const subContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    height: '4rem'
};

export const cancelButtonStyle = {
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    lineHeight: '0',
    height: '2rem',
    width: '2rem',
    top: '1rem',
    right: '1rem',
    backgroundColor: 'salmon',
    color: 'white',
    fontSize: '2rem',
    outline: 'none',
    cursor: 'pointer'
};

export const errorMatchTextStyle = {
    position: 'relative',
    top: '1rem',
    lineHeight: '0',
    color: '#c12d29'
};

export const topRowStyle = {
    display: 'flex',
    flexDirection: 'row'
};

export const finalContainerStyle = {
    padding: '2.5rem',

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
};

export const dateGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gridTemplateRows: 'repeat(2, 1fr)',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '2rem',
    zIndex: '22'
};

export const dateTopContainer = {
    display: 'flex',
    flexDirection: 'column',
    padding: '2rem',
    alignItems: 'center'
};

export const dateRangeContainer = {
    display: 'flex',
    flexDirection: 'row',
    zIndex: '21'
};

export const dateContainer = {
    margin: '1rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    zIndex: '20'
};

export const dateLabel = {
    marginBottom: '1rem'
};

export const autoContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    margin: '1rem'
};
