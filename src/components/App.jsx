import React, { useEffect, useState } from "react";
import Table from "./Table";
import taskList from "../data/taskList";
import sortList from "../processing/sortList";

const App = () => {
  // const [ tableView, setTableView ] = useState('tasks');
  const [sortType, setSortType] = useState("date");
  const [sortReversed, setSortReversed] = useState(false);
  const sortedList = sortList(sortType, taskList);

  return (
    <div>
      <h1>PROJECT MANAGEMENT PLATFORM</h1>
      <Table
        taskList={sortedList}
        sortOptions={{ type: sortType, reversed: sortReversed }}
        setSortType={val => setSortType(val)}
      />
    </div>
  );
};

export default App;
