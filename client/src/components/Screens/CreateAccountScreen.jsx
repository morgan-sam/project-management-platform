import React, { useEffect, useState } from 'react';
import {
    LoginTitle,
    AccountScreen,
    AccountEntryBox,
    LoginSignupFooter
} from 'styling/accountEntry';
import { withRouter } from 'react-router';
import PageNavigation from 'components/PageNavigation';
import CreateAccountPageOne from 'components/Screens/CreateAccountScreen/CreateAccountPageOne';
import CreateAccountPageTwo from 'components/Screens/CreateAccountScreen/CreateAccountPageTwo';
import CreateAccountPageThree from 'components/Screens/CreateAccountScreen/CreateAccountPageThree';
import CreateAccountPageFour from 'components/Screens/CreateAccountScreen/CreateAccountPageFour';
import app from 'config/firebase';
import { checkIfEmailValid } from 'processing/validity';

const CreateAccountScreen = ({ history }) => {
    const [currentPage, setCurrentPage] = useState(0);
    const [currentPageComplete, setCurrentPageComplete] = useState(false);
    const [managerDetails, setManagerDetails] = useState({
        email: 'test@email.com',
        password: '123456789'
    });
    const [teamMembers, setTeamMembers] = useState(['user@mail.com']);

    const checkIfEmailPasswordValid = (email, password) => {
        const emailValid = checkIfEmailValid(email);
        const passwordValid = password.length >= 6;
        return emailValid && passwordValid;
    };

    const actionCodeSettings = {
        url: 'http://localhost:3000/',
        handleCodeInApp: true
    };

    const addAccounts = async () => {
        const { email, password } = managerDetails;
        try {
            await app.auth().createUserWithEmailAndPassword(email, password);
            teamMembers.map(
                async (el) =>
                    await app
                        .auth()
                        .sendSignInLinkToEmail(el, actionCodeSettings)
            );
            history.push('/');
        } catch (error) {
            alert(error);
        }
    };

    useEffect(() => {
        setCurrentPageComplete(false);
        const checkIfPageComplete = async () => {
            if (currentPage === 0) setCurrentPageComplete(true);
            else if (currentPage === 1) {
                const bothValid = checkIfEmailPasswordValid(
                    managerDetails.email,
                    managerDetails.password
                );
                setCurrentPageComplete(bothValid);
            } else if (currentPage === 2) setCurrentPageComplete(true);
        };
        checkIfPageComplete();
    }, [currentPage, managerDetails]);

    const pages = [
        <CreateAccountPageOne />,
        <CreateAccountPageTwo {...{ managerDetails, setManagerDetails }} />,
        <CreateAccountPageThree {...{ teamMembers, setTeamMembers }} />,
        <CreateAccountPageFour
            {...{ managerDetails, teamMembers, addAccounts }}
        />
    ];

    return (
        <AccountScreen>
            <AccountEntryBox>
                <LoginTitle>Create Account</LoginTitle>
                {pages[currentPage]}
                <PageNavigation
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    currentPageComplete={currentPageComplete}
                    totalPages={pages.length}
                />
                <LoginSignupFooter>
                    Returning? <a href="/login">Log In</a>
                </LoginSignupFooter>
            </AccountEntryBox>
        </AccountScreen>
    );
};

export default withRouter(CreateAccountScreen);
