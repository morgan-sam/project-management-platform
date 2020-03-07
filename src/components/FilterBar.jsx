import React from "react";
import DateSelect from "./DateSelect";

const FilterBar = props => {
  return (
    <div className="filterBar" style={props.style}>
      <DateSelect />
    </div>
  );
};

export default FilterBar;
