export const getTaskListTeams = (taskList) => {
  const availableTeams = taskList.map((el) => el.teams).flat();
  return Array.from(new Set(availableTeams)).sort();
};

export const formatTeamsDropdownSelect = (select, filterOptions) => {
  let newState = filterOptions.teams.filter((el) => el !== "all");
  if (select === "all") newState = ["all"];
  else if (newState.includes(select))
    newState = newState.filter((el) => el !== select);
  else newState.push(select);
  if (newState.length === 0) newState = ["all"];
  return newState;
};
