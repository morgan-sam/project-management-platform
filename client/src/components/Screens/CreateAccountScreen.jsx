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
import {
	pageTwoInterfaceStyle,
	pageThreeTitleStyle,
	listStyle,
	listLineStyle,
	removeButtonStyle,
	noTeamMembersStyle
} from 'styling/createAccountStyle';

const CreateAccountScreen = ({ history }) => {
	const [ currentPage, setCurrentPage ] = useState(0);
	const [ currentPageComplete, setCurrentPageComplete ] = useState(false);
	const [ managerDetails, setManagerDetails ] = useState({
		email: '',
		password: ''
	});
	const [ teamMembers, setTeamMembers ] = useState([ 'hello@aol.com', 'world@sky.com' ]);

	const generateSubText = () => createAccountText[currentPage].map((el) => <div style={textStyle}>{el}</div>);

	const checkIfEmailValid = async (email) => {
		try {
			const signInMethods = await app.auth().fetchSignInMethodsForEmail(email);
			return signInMethods.length === 0;
		} catch (error) {
			return false;
		}
	};

	const checkIfEmailPasswordValid = async (email, password) => {
		try {
			const emailValid = await checkIfEmailValid(email);
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
				} else if (currentPage === 2) setCurrentPageComplete(true);
			};
			checkIfPageComplete();
		},
		[ currentPage, managerDetails ]
	);

	const getPageInterface = (page) => {
		if (page === 1) return <ObjectInput obj={managerDetails} setObj={setManagerDetails} />;
		else if (page === 2)
			return (
				<div style={pageTwoInterfaceStyle}>
					<h3 style={pageThreeTitleStyle}>Added Members:</h3>
					<div style={listStyle}>
						{teamMembers.length ? (
							teamMembers.map((el, i) => (
								<div style={listLineStyle}>
									{el}
									<div
										style={removeButtonStyle}
										onClick={() => {
											const removed = [ ...teamMembers.slice(0, i), ...teamMembers.slice(i + 1) ];
											setTeamMembers(removed);
										}}
									>
										✕
									</div>
								</div>
							))
						) : (
							<div style={noTeamMembersStyle}>(No team members added - can be added later instead)</div>
						)}
					</div>
					<Form
						style={{ flexDirection: 'row', margin: '0.75rem' }}
						onSubmit={async (e) => {
							e.preventDefault();
							const { email } = e.target.elements;
							const emailValid = await checkIfEmailValid(email.value);
							if (emailValid) {
								setTeamMembers([ ...teamMembers, email.value ]);
								email.value = '';
							}
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
