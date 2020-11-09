import React, { useCallback, useContext } from "react";
import Form from "components/Form";
import {
  LoginTitle,
  AccountScreen,
  accountEntryBox,
  footerStyle,
} from "styling/accountEntry";
import { withRouter, Redirect } from "react-router";
import app from "config/firebase";
import { AuthContext } from "config/auth";

const LoginScreen = ({ history }) => {
  const handleLogin = useCallback(
    async (e) => {
      e.preventDefault();
      const { email, password } = e.target.elements;
      try {
        await app
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);
        history.push("/");
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );
  const { currentUser } = useContext(AuthContext);
  if (currentUser) return <Redirect to="/" />;
  return (
    <AccountScreen>
      <div style={accountEntryBox}>
        <LoginTitle>Log In</LoginTitle>
        <Form
          onSubmit={handleLogin}
          inputs={["email", "password"]}
          submitLabel={"Log In"}
        />
        <div style={footerStyle}>
          New here? <a href="/signup">Sign Up</a>
        </div>
      </div>
    </AccountScreen>
  );
};

export default withRouter(LoginScreen);
