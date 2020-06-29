import React, { useCallback, useContext } from 'react';
import { createAccountText } from 'data/createAccountText';
import { loginTitle, accountScreenStyle, accountEntryBox } from 'styling/accountEntry';
import { withRouter, Redirect } from 'react-router';
import app from 'config/firebase';
import { AuthContext } from 'config/auth';

const CreateAccountScreen = ({ history }) => {
	const handleLogin = useCallback(
		async (e) => {
			e.preventDefault();
			const { email, password } = e.target.elements;
			try {
				await app.auth().createUserWithEmailAndPassword(email.value, password.value);
				history.push('/');
			} catch (error) {
				alert(error);
			}
		},
		[ history ]
	);
	const { currentUser } = useContext(AuthContext);
	if (currentUser) return <Redirect to="/" />;

	const textContainerStyle = {
		margin: '1rem'
	};

	const generateSubText = () => createAccountText.map((el) => <div style={{ padding: '1rem' }}>{el}</div>);

	return (
		<div style={accountScreenStyle}>
			<div style={accountEntryBox}>
				<div style={loginTitle}>Create Account</div>
				<div style={textContainerStyle}>{generateSubText()}</div>
				<div style={{ padding: '1rem' }}>
					Returning? <a href="/login">Log In</a>
				</div>
			</div>
		</div>
	);
};

export default withRouter(CreateAccountScreen);
