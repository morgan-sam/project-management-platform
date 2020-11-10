import React, { useContext } from "react";
import { mainTitleContainer, getMainTitleStyle } from "styling/mainTitle";
import ThemeContext from "context/ThemeContext";

const MainTitle = (props) => {
  const themeColor = useContext(ThemeContext);
  return (
    <div style={{ ...props.style, ...mainTitleContainer }}>
      <h1 style={getMainTitleStyle(themeColor)}>PROJECT MANAGEMENT PLATFORM</h1>
    </div>
  );
};

export default MainTitle;
