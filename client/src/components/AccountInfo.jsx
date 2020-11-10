import React from 'react';
import app from 'config/firebase';
import styled from '@emotion/styled';

const AccountInfoText = styled.h3`
    position: absolute;
    top: 0;
    right: 0;
    margin: 1rem;
`;

const AccountInfo = () => {
    return (
        <AccountInfoText>
            Logged in as: {app.auth().currentUser.email}
        </AccountInfoText>
    );
};

export default AccountInfo;
