import React from "react";
import Cell from "./Cell";

const TableHeadings = props => {
  const sortArrow = props.sortOptions.reversed ? "↓" : "↑";

  return (
    <div className="tableHeadings" style={{ cursor: "pointer" }}>
      <Cell
        text={`Task ${props.sortOptions.type === "task" ? sortArrow : ""}`}
        onClick={() => props.setSortType("task")}
      />
      <Cell
        text={`Date ${props.sortOptions.type === "date" ? sortArrow : ""}`}
        onClick={() => props.setSortType("date")}
      />
      <Cell
        text={`Deadline ${
          props.sortOptions.type === "deadline" ? sortArrow : ""
        }`}
        onClick={() => props.setSortType("deadline")}
      />
      <Cell
        text={`Urgency ${
          props.sortOptions.type === "urgency" ? sortArrow : ""
        }`}
        onClick={() => props.setSortType("urgency")}
      />
      <Cell
        text={`Team ${props.sortOptions.type === "team" ? sortArrow : ""}`}
        onClick={() => props.setSortType("team")}
      />
      <Cell
        text={`Completed ${
          props.sortOptions.type === "completed" ? sortArrow : ""
        }`}
        onClick={() => props.setSortType("completed")}
      />
    </div>
  );
};

export default TableHeadings;
