import React, { useEffect } from 'react';
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
import { useState } from 'react';

const CreateAccountScreen = ({ history }) => {
	const [ currentPage, setCurrentPage ] = useState(0);
	const [ currentPageComplete, setCurrentPageComplete ] = useState(false);

	const generateSubText = () => createAccountText[currentPage].map((el) => <div style={textStyle}>{el}</div>);

	useEffect(
		() => {
			if (currentPage === 0) setCurrentPageComplete(true);
			else if (currentPage === 1) setCurrentPageComplete(false);
			else if (currentPage === 2) setCurrentPageComplete(false);
		},
		[ currentPage ]
	);

	return (
		<div style={accountScreenStyle}>
			<div style={accountEntryBox}>
				<div style={loginTitle}>Create Account</div>
				<div style={textContainerStyle}>{generateSubText()}</div>
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
