import React from "react";
import { capitalizeFirstLetter } from "processing/utility";

const Form = (props) => {
  const { submitLabel, onSubmit, inputs } = props;

  const formStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  const formInputStyle = {
    display: "flex",
    alignItems: "center",
  };

  const formLabelStyle = {
    margin: "1rem",
  };

  const formTextAreaStyle = {
    height: "1.4rem",
    textIndent: "5px",
  };

  const buttonStyle = {
    margin: "1rem",
    width: "fit-content",
    padding: "0.3rem 1rem",
  };

  return (
    <form onSubmit={onSubmit} style={{ ...formStyle, ...props.style }}>
      {inputs.map((el, i) => (
        <label key={i} style={formInputStyle}>
          <span style={formLabelStyle}>{capitalizeFirstLetter(el)}</span>
          <input
            style={formTextAreaStyle}
            name={el}
            type={el}
            placeholder={capitalizeFirstLetter(el)}
          />
        </label>
      ))}
      <button type="submit" style={buttonStyle}>
        {submitLabel}
      </button>
    </form>
  );
};

export default Form;
