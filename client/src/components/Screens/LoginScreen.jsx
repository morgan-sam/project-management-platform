import React, { useCallback, useContext } from 'react';
import Form from 'components/Form';
import { loginTitle, accountScreenStyle, accountEntryBox, footerStyle } from 'styling/accountEntry';
import { withRouter, Redirect } from 'react-router';
import app from 'config/firebase';
import { AuthContext } from 'config/auth';

const LoginScreen = ({ history }) => {
	const handleLogin = useCallback(
		async (e) => {
			e.preventDefault();
			const { email, password } = e.target.elements;
			try {
				await app.auth().signInWithEmailAndPassword(email.value, password.value);
				history.push('/');
			} catch (error) {
				alert(error);
			}
		},
		[ history ]
	);
	const { currentUser } = useContext(AuthContext);
	if (currentUser) return <Redirect to="/" />;
	return (
		<div style={accountScreenStyle}>
			<div style={accountEntryBox}>
				<div style={loginTitle}>Log In</div>
				<Form onSubmit={handleLogin} inputs={[ 'email', 'password' ]} submitLabel={'Log In'} />
				<div style={footerStyle}>
					New here? <a href="/signup">Sign Up</a>
				</div>
			</div>
		</div>
	);
};

export default withRouter(LoginScreen);
