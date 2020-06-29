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
import Form from 'components/Form';
import ObjectInput from 'components/ObjectInput';
import app from 'config/firebase';

const CreateAccountScreen = ({ history }) => {
	const [ currentPage, setCurrentPage ] = useState(2);
	const [ currentPageComplete, setCurrentPageComplete ] = useState(false);
	const [ managerDetails, setManagerDetails ] = useState({
		email: '',
		password: ''
	});
	const [ teamMembers, setTeamMembers ] = useState([ 'hello@aol.com', 'world@sky.com' ]);

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

	const getPageInterface = (page) => {
		if (page === 1) return <ObjectInput obj={managerDetails} setObj={setManagerDetails} />;
		else if (page === 2)
			return (
				<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
					<div>{teamMembers.map((el) => <div>{el}</div>)}</div>
					<Form
						style={{ flexDirection: 'row' }}
						onSubmit={(e) => {
							e.preventDefault();
							const { email } = e.target.elements;
							setTeamMembers([ ...teamMembers, email.value ]);
						}}
						inputs={[ 'email' ]}
						submitLabel={'Add User'}
					/>
				</div>
			);
	};

	return (
		<div style={accountScreenStyle}>
			<div style={accountEntryBox}>
				<div style={loginTitle}>Create Account</div>
				<div style={textContainerStyle}>{generateSubText()}</div>
				{getPageInterface(currentPage)}
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
