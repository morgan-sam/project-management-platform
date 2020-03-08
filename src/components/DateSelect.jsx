import React from "react";
import Dropdown from "./Dropdown";

const DateSelect = props => {
  return (
    <div className="dateSelect" style={{ display: "flex" }}>
      <Dropdown style={{ margin: "0 0.5rem" }} options={[1, 2, 3, 4]} />
      <Dropdown style={{ margin: "0 0.5rem" }} options={[1, 2, 3, 4]} />
      <Dropdown style={{ margin: "0 0.5rem" }} options={[1, 2, 3, 4]} />
    </div>
  );
};

export default DateSelect;
