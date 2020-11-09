import styled from "@emotion/styled";

export const LoginTitle = styled.h1`
  margin: 1rem;
  font-size: 2rem;
  text-decoration: underline;
`;

export const AccountScreen = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const accountEntryBox = {
  width: "fit-content",
  padding: "2rem",
  border: "2px solid black",
  borderRadius: "1rem",
  fontSize: "1.7rem",
  color: "black",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
};

export const textContainerStyle = {
  padding: "1rem",
};

export const textStyle = {
  padding: "1rem",
  fontSize: "1.3rem",
};

export const footerStyle = {
  padding: "1rem",
  fontSize: "1rem",
};
