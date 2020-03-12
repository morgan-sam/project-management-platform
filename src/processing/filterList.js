export const filterList = (filterOptions, taskList) => {
	let filteredList = taskList;
	filteredList = filteredList.filter((el) => filterOptions.date <= el.date);
	filteredList = filteredList.filter((el) => filterOptions.deadline >= el.deadline);
	filteredList = filterListCompletion(filterOptions, filteredList);
	filteredList = filteredList.filter((el) => filterOptions.urgency.min <= el.urgency);
	filteredList = filteredList.filter((el) => filterOptions.urgency.max >= el.urgency);
	filteredList = filterListTeams(filterOptions, filteredList);
	return filteredList;
};

const filterListTeams = (filterOptions, list) => {
	console.log(filterOptions);
	return list.filter(function(el) {
		if (filterOptions.teams === 'all') return true;
		else if (filterOptions.teams === el.team) return true;
		else return false;
	});
};

const filterListCompletion = (filterOptions, list) => {
	return list.filter(function(el) {
		if (filterOptions.completion === 'all') return true;
		else if (filterOptions.completion === 'complete' && el.completed) return true;
		else if (filterOptions.completion === 'incomplete' && !el.completed) return true;
		else return false;
	});
};

export const getTaskListTeams = (taskList) => {
	const availableTeams = taskList.map((el) => el.team);
	return Array.from(new Set(availableTeams)).sort();
};

export default filterList;
