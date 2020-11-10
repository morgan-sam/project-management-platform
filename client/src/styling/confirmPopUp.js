import { flexCenterColumn, flexCenter } from "styling/generic";

export const popUpContainerStyle = {
  ...flexCenterColumn,
  position: "fixed",
  top: "50vh",
  left: "50vw",
  height: "12rem",
  width: "23rem",
  border: "1px solid black",
  transform: "translate(-50%,-50%)",
  backgroundColor: "white",
  zIndex: "20",
  animation: "confirm-popup-fade-in 1s",
};

export const buttonContainerStyle = {
  ...flexCenter,
  margin: "1rem",
};

export const buttonStyle = {
  width: "5rem",
  height: "2rem",
  lineHeight: "0",
};

export const messageContainerStyle = {
  width: "75%",
  textAlign: "center",
  lineHeight: "1.5rem",
  margin: "2rem 0 0 0",
};
