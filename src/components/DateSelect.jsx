import React from "react";
import Dropdown from "./Dropdown";

const DateSelect = props => {
  return (
    <div className="dateSelect" style={{ display: "flex" }}>
      <Dropdown style={{ margin: "0 0.5rem" }} />
      <Dropdown style={{ margin: "0 0.5rem" }} />
      <Dropdown style={{ margin: "0 0.5rem" }} />
    </div>
  );
};

export default DateSelect;
