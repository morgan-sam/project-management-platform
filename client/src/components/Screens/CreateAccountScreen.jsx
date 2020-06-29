import React, { useCallback, useContext } from 'react';
import { createAccountText } from 'data/createAccountText';
import {
	loginTitle,
	accountScreenStyle,
	accountEntryBox,
	textContainerStyle,
	textStyle,
	footerStyle
} from 'styling/accountEntry';
import { withRouter, Redirect } from 'react-router';
import app from 'config/firebase';
import { AuthContext } from 'config/auth';
import PageNavigation from 'components/PageNavigation';
import { useState } from 'react';

const CreateAccountScreen = ({ history }) => {
	const [ currentPage, setCurrentPage ] = useState(0);

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

	const generateSubText = () => createAccountText[currentPage].map((el) => <div style={textStyle}>{el}</div>);

	return (
		<div style={accountScreenStyle}>
			<div style={accountEntryBox}>
				<div style={loginTitle}>Create Account</div>
				<div style={textContainerStyle}>{generateSubText()}</div>
				<PageNavigation
					currentPage={currentPage}
					setCurrentPage={setCurrentPage}
					totalPages={createAccountText.length}
				/>
				<div style={footerStyle}>
					Returning? <a href="/login">Log In</a>
				</div>
			</div>
		</div>
	);
};

export default withRouter(CreateAccountScreen);
