import React, { useState, useContext } from "react";
import ThemeContext from "context/ThemeContext";
import { flexCenter } from "styling/generic";

const WizardButton = (props) => {
  const [hover, setHover] = useState(false);
  const themeColor = useContext(ThemeContext);

  const wizardBtnStyle = {
    ...flexCenter,
    width: "1.3rem",
    height: "1.3rem",
    border: "1px solid black",
    userSelect: "none",
    color: hover ? "white" : "black",
    backgroundColor: hover ? themeColor : "white",
  };

  return (
    <div
      onClick={(val) => props.onClick(val)}
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={wizardBtnStyle}
    >
      <span role="img" aria-label="lightning">
        ⚡
      </span>
    </div>
  );
};

export default WizardButton;
