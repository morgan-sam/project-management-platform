import React from "react";
import Dropdown from "components/Dropdown";
import { flexCenter } from "styling/generic";

const DropdownWithLabel = (props) => {
  const containerStyle = {
    ...flexCenter,
    margin: "1rem",
  };

  const itemStyle = {
    margin: "1rem",
  };

  return (
    <div style={containerStyle}>
      <div className="dropdownLabel" style={itemStyle}>
        {props.label}:
      </div>
      <Dropdown
        className="dropdown"
        style={{
          itemStyle,
          width: props.width,
        }}
        selected={props.selected}
        options={props.options}
        onClick={(val) => props.onClick(val)}
        onOpenChange={props.setOverflowHidden}
      />
    </div>
  );
};

export default DropdownWithLabel;
