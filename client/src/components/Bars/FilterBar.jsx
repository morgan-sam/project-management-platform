import React, { useState } from "react";
import FilterToggle from "components/FilterToggle";
import ColorButton from "components/ColorButton";
import DateRangeSelect from "components/DateRangeSelect";
import UrgencyRangeSelect from "components/UrgencyRangeSelect";
import CompletionSelect from "components/CompletionSelect";
import Dropdown from "components/Dropdown";
import MatchType from "components/MatchType";
import { parseISOToDateObj } from "processing/dates";
import {
  getTaskBarHiddenStyle,
  getTaskBarVisibleStyle,
  filterBarStyle,
  filterBarItemStyle,
} from "styling/taskBars";
import { formatTeamsDropdownSelect } from "processing/teams";
import { getDefaultFilterOptions } from "data/defaultState";

const FilterBar = (props) => {
  const {
    taskListTeams,
    filterOptions,
    setFilterOptions,
    displayedBars,
  } = props;
  const [dropdownsOpen, setDropdownsOpen] = useState({
    date: false,
    urgency: false,
    teams: false,
    completion: false,
  });
  const [popUpOpen, setPopUpOpen] = useState(false);

  return (
    <div
      className="filterBar"
      style={{
        ...filterBarStyle,
        ...(displayedBars.filter
          ? getTaskBarVisibleStyle(popUpOpen)
          : getTaskBarHiddenStyle(popUpOpen)),
        overflow: Object.values(dropdownsOpen).includes(true)
          ? "visible"
          : "hidden",
      }}
    >
      <FilterToggle {...props} style={filterBarItemStyle} />
      <ColorButton
        className="resetFilterBtn"
        onClick={() => {
          const active = props.filterOptions.active;
          props.setFilterOptions({
            ...getDefaultFilterOptions(props.rawTaskList, active),
          });
        }}
        text={"Reset Filter"}
        style={{ width: "6rem" }}
      />
      <DateRangeSelect
        {...props}
        style={filterBarItemStyle}
        date={parseISOToDateObj(props.filterOptions.date)}
        deadline={parseISOToDateObj(props.filterOptions.deadline)}
        setDate={(val) =>
          props.setFilterOptions({
            ...props.filterOptions,
            date: val,
          })
        }
        setDeadline={(val) =>
          props.setFilterOptions({
            ...props.filterOptions,
            deadline: val,
          })
        }
        setOverflowHidden={(val) =>
          setDropdownsOpen({ ...dropdownsOpen, date: val })
        }
        setPopUpOpen={setPopUpOpen}
      />
      <UrgencyRangeSelect
        {...props}
        style={filterBarItemStyle}
        onChange={(min, max) =>
          props.setFilterOptions({
            ...props.filterOptions,
            urgency: {
              min,
              max,
            },
          })
        }
        urgency={props.filterOptions.urgency}
        setOverflowHidden={(val) =>
          setDropdownsOpen({ ...dropdownsOpen, urgency: val })
        }
      />
      <Dropdown
        type={"checkbox"}
        label={"Teams"}
        onClick={(val) => {
          setFilterOptions({
            ...filterOptions,
            teams: formatTeamsDropdownSelect(val, filterOptions),
          });
        }}
        options={taskListTeams}
        filterOptions={filterOptions}
        selected={filterOptions.teams}
        style={{ ...filterBarItemStyle, width: "8rem", zIndex: "10" }}
        onOpenChange={(val) =>
          setDropdownsOpen({ ...dropdownsOpen, teams: val })
        }
      />
      <MatchType
        default={props.filterOptions.teamMatch}
        onChange={(val) =>
          props.setFilterOptions({
            ...props.filterOptions,
            teamMatch: val,
          })
        }
      />
      <CompletionSelect
        {...props}
        state={[filterOptions, setFilterOptions]}
        setOverflowHidden={(val) =>
          setDropdownsOpen({ ...dropdownsOpen, completion: val })
        }
      />
    </div>
  );
};

export default FilterBar;
