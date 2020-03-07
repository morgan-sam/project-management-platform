import React from "react";
import Task from "./Task";
import TableHeadings from "./TableHeadings";

const Table = props => {
  const tasks = props.taskList.map((el, i) => <Task key={i} {...el} />);

  return (
    <div className="table">
      <TableHeadings
        sortOptions={props.sortOptions}
        userSetSort={val => props.userSetSort(val)}
      />
      {tasks}
    </div>
  );
};

export default Table;
