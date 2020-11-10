import React from "react";
import DateOptionSlide from "components/DateOptionSlide";

const DateRangeSelect = (props) => {
  const elStyle = { margin: "0 1rem" };

  const dateRangeSelectStyle = {
    display: "flex",
    alignItems: "center",
  };

  return (
    <div
      className="DateRangeSelect"
      style={{ ...props.style, ...dateRangeSelectStyle }}
    >
      <div className="filterBarLabel" style={elStyle}>
        Date:
      </div>
      <DateOptionSlide
        {...props}
        style={elStyle}
        setSelectDate={(val) => props.setDate(val)}
        date={props.date}
      />
      <div className="filterBarLabel" style={elStyle}>
        Deadline:
      </div>
      <DateOptionSlide
        {...props}
        style={elStyle}
        setSelectDate={(val) => props.setDeadline(val)}
        date={props.deadline}
      />
    </div>
  );
};

export default DateRangeSelect;
