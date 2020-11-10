export const cellStyle = {
    width: '7rem',
    padding: '1rem',
    borderTop: '2px solid #444',
    borderLeft: '2px solid #444',
    backgroundColor: '#fff',
    textAlign: 'center',
    zIndex: '7'
};

export const idDefaultCell = {
    ...cellStyle
};

export const taskDefaultCell = {
    ...cellStyle,
    width: '15rem',
    textAlign: 'left',
    cursor: 'pointer'
};

export const dateDefaultCell = {
    ...cellStyle
};

export const deadlineDefaultCell = {
    ...cellStyle
};

export const urgencyDefaultCell = {
    ...cellStyle
};

export const teamsDefaultCell = {
    ...cellStyle
};

export const completedDefaultCell = {
    ...cellStyle,
    cursor: 'pointer'
};

export const selectedDefaultCell = {
    ...cellStyle,
    cursor: 'pointer',
    width: '1rem'
};
