import React, { useEffect, useState } from 'react';
import {
    LoginTitle,
    AccountScreen,
    AccountEntryBox
} from 'styling/accountEntry';
import { withRouter } from 'react-router';
import PageNavigation from 'components/PageNavigation';
import CreateAccountPageOne from 'components/Screens/CreateAccountScreen/CreateAccountPageOne';
import CreateAccountPageTwo from 'components/Screens/CreateAccountScreen/CreateAccountPageTwo';
import CreateAccountPageThree from 'components/Screens/CreateAccountScreen/CreateAccountPageThree';
import app from 'config/firebase';
import { checkIfEmailValid } from 'processing/validity';

const CreateAccountScreen = ({ history }) => {
    const [currentPage, setCurrentPage] = useState(0);
    const [currentPageComplete, setCurrentPageComplete] = useState(false);
    const [managerDetails, setManagerDetails] = useState({
        email: 'test@email.com',
        password: '123456789'
    });

    const checkIfEmailPasswordValid = (email, password) => {
        const emailValid = checkIfEmailValid(email);
        const passwordValid = password.length >= 6;
        return emailValid && passwordValid;
    };

    const actionCodeSettings = {
        url: 'http://localhost:3000/',
        handleCodeInApp: true
    };

    const addAccount = async () => {
        const { email, password } = managerDetails;
        try {
            await app.auth().createUserWithEmailAndPassword(email, password);
            history.push('/');
        } catch (error) {
            alert(error);
        }
    };

    useEffect(() => {
        setCurrentPageComplete(false);
        const checkIfPageComplete = async () => {
            if (currentPage === 0) setCurrentPageComplete(true);
            else if (currentPage === 1) setCurrentPageComplete(true);
            else if (currentPage === 2) setCurrentPageComplete(true);
        };
        checkIfPageComplete();
    }, [currentPage, managerDetails]);

    const pages = [
        <CreateAccountPageOne />,
        <CreateAccountPageTwo />,
        <CreateAccountPageThree />
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
            </AccountEntryBox>
        </AccountScreen>
    );
};

export default withRouter(CreateAccountScreen);
