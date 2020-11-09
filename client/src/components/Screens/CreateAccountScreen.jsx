import React, { useEffect, useState } from "react";
import { css, jsx } from "@emotion/core";
import { createAccountText } from "data/createAccountText";
import {
  LoginTitle,
  AccountScreen,
  AccountEntryBox,
  LoginSignupFooter,
} from "styling/accountEntry";
import { withRouter } from "react-router";
import PageNavigation from "components/PageNavigation";
import ObjectInput from "components/ObjectInput";
import PageThreeInterface from "components/Screens/CreateAccountScreen/PageThreeInterface";
import PageFourInterface from "components/Screens/CreateAccountScreen/PageFourInterface";
import app from "config/firebase";
import { checkIfEmailValid } from "processing/validity";

const CreateAccountScreen = ({ history }) => {
  const [currentPage, setCurrentPage] = useState(3);
  const [currentPageComplete, setCurrentPageComplete] = useState(false);
  const [managerDetails, setManagerDetails] = useState({
    email: "test@email.com",
    password: "123456789",
  });
  const [teamMembers, setTeamMembers] = useState(["user@mail.com"]);

  const generateSubText = () =>
    createAccountText[currentPage].map((el, i) => (
      <div
        key={i}
        css={css`
          padding: 1rem;
          fontsize: 1.3rem;
        `}
      >
        {el}
      </div>
    ));

  const checkIfEmailPasswordValid = (email, password) => {
    const emailValid = checkIfEmailValid(email);
    const passwordValid = password.length >= 6;
    return emailValid && passwordValid;
  };

  const actionCodeSettings = {
    url: "http://localhost:3000/",
    handleCodeInApp: true,
  };

  const addAccounts = async () => {
    const { email, password } = managerDetails;
    try {
      await app.auth().createUserWithEmailAndPassword(email, password);
      teamMembers.map(
        async (el) =>
          await app.auth().sendSignInLinkToEmail(el, actionCodeSettings)
      );
      history.push("/");
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

  const getPageInterface = (page) => {
    if (page === 1)
      return <ObjectInput obj={managerDetails} setObj={setManagerDetails} />;
    else if (page === 2)
      return <PageThreeInterface {...{ teamMembers, setTeamMembers }} />;
    else if (page === 3)
      return (
        <PageFourInterface {...{ managerDetails, teamMembers, addAccounts }} />
      );
  };

  return (
    <AccountScreen>
      <AccountEntryBox>
        <LoginTitle>Create Account</LoginTitle>
        <div
          css={css`
            padding: 1rem;
          `}
        >
          {generateSubText()}
        </div>
        {getPageInterface(currentPage)}
        <PageNavigation
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          currentPageComplete={currentPageComplete}
          totalPages={createAccountText.length}
        />
        <LoginSignupFooter>
          Returning? <a href="/login">Log In</a>
        </LoginSignupFooter>
      </AccountEntryBox>
    </AccountScreen>
  );
};

export default withRouter(CreateAccountScreen);
