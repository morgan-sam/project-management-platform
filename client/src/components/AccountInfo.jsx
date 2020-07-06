import React from 'react';
import app from 'config/firebase';

const accountInfoStyle = {
	position: 'absolute',
	top: '0',
	right: '0',
	margin: '1rem'
};

const AccountInfo = () => {
	return <h3 style={accountInfoStyle}>Logged in as: {app.auth().currentUser.email}</h3>;
};

export default AccountInfo;
