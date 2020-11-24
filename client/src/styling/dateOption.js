import styled from '@emotion/styled';

export const DateOptionSlideContainer = styled.div`
    display: flex;
    justify-content: left;
    alignitems: center;
    border: 1px solid black;
    transition: 1s;
    position: relative;
    border-radius: 5px;

    overflow: ${(props) => (props.overflowHidden ? 'visible' : 'hidden')};

    ${(props) =>
        props.showDateSelect
            ? 'width: 18rem; height: 10rem;'
            : 'width: 7rem; height: 3rem;'}
`;

export const DateDisplayBox = styled.div`
    height: auto;
    padding: 0 0.5rem;
    text-align: center;
    user-select: none;
    cursor: pointer;
    transition: 1s;

    position: absolute;
    top: 50%;
    z-index: 5;
    ${(props) =>
        props.showDateSelect
            ? `left: 0%;
            transform: translate(-150%,-50%);
            opacity: 0;`
            : `left: 50%;
            transform: translate(-50%, -50%);
            opacity: 1;`};
`;

export const DateSelectConfirmContainer = styled.div`
    transition: 1s;
    position: absolute;
    top: 50%;
    z-index: 3;

    ${(props) =>
        props.showDateSelect
            ? 'left: 50%; transform: translate(-50%,-50%); opacity: 1;'
            : 'left: 0%; transform: translate(100%,-50%); opacity: 0;'}
`;

export const canConContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: '0.75rem',
    transition: '0.5s'
};

export const canConBtnStyle = {
    margin: '0.5rem',
    height: '2.2rem',
    width: '2.2rem',
    boxShadow: '1px 1px 1px 1px #ddd',
    color: '#eee',
    fontSize: '2rem',
    fontWeight: 'bold',
    WebkitTextStroke: '0.7px #222',
    display: 'flex',
    justifyContent: 'center',
    lineHeight: '1.72rem',
    outline: 'none'
};

export const confirmBtnStyle = {
    backgroundColor: '#b3ff99',
    userSelect: 'none',
    cursor: 'pointer',
    border: '3px solid #99ff99',
    borderRadius: '5px'
};

export const cancelBtnStyle = {
    backgroundColor: '#ff9999',
    userSelect: 'none',
    cursor: 'pointer',
    border: '3px solid #ff8080',
    borderRadius: '5px'
};
