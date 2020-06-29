import React, { useEffect, useState } from 'react';
import { createAccountText } from 'data/createAccountText';
import {
	loginTitle,
	accountScreenStyle,
	accountEntryBox,
	textContainerStyle,
	textStyle,
	footerStyle
} from 'styling/accountEntry';
import { withRouter } from 'react-router';
import PageNavigation from 'components/PageNavigation';
import ObjectInput from 'components/ObjectInput';
import app from 'config/firebase';

const CreateAccountScreen = ({ history }) => {
	const [ currentPage, setCurrentPage ] = useState(0);
	const [ currentPageComplete, setCurrentPageComplete ] = useState(false);
	const [ managerDetails, setManagerDetails ] = useState({
		email: '',
		password: ''
	});

	const generateSubText = () => createAccountText[currentPage].map((el) => <div style={textStyle}>{el}</div>);

	const checkIfEmailPasswordValid = async (email, password) => {
		try {
			const signInMethods = await app.auth().fetchSignInMethodsForEmail(email);
			const emailValid = signInMethods.length === 0;
			const passwordValid = password.length >= 6;
			return emailValid && passwordValid;
		} catch (error) {
			return false;
		}
	};

	useEffect(
		() => {
			setCurrentPageComplete(false);
			const checkIfPageComplete = async () => {
				if (currentPage === 0) setCurrentPageComplete(true);
				else if (currentPage === 1) {
					const bothValid = await checkIfEmailPasswordValid(managerDetails.email, managerDetails.password);
					setCurrentPageComplete(bothValid);
				} else if (currentPage === 2) setCurrentPageComplete(false);
			};
			checkIfPageComplete();
		},
		[ currentPage, managerDetails ]
	);

	return (
		<div style={accountScreenStyle}>
			<div style={accountEntryBox}>
				<div style={loginTitle}>Create Account</div>
				<div style={textContainerStyle}>{generateSubText()}</div>
				{currentPage === 1 && <ObjectInput obj={managerDetails} setObj={setManagerDetails} />}
				<PageNavigation
					currentPage={currentPage}
					setCurrentPage={setCurrentPage}
					currentPageComplete={currentPageComplete}
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
