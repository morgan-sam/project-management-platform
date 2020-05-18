export const filterList = (filterOptions, taskList) => {
	let filteredList = taskList;
	filteredList = filteredList.filter((el) => filterOptions.date <= el.date);
	filteredList = filterListDeadline(filterOptions, filteredList);
	filteredList = filterListCompletion(filterOptions, filteredList);
	filteredList = filteredList.filter((el) => filterOptions.urgency.min <= el.urgency);
	filteredList = filteredList.filter((el) => filterOptions.urgency.max >= el.urgency);
	filteredList = filterListTeams(filterOptions, filteredList);
	return filteredList;
};

const filterListDeadline = (filterOptions, list) => {
	return list.filter((el) => {
		const filterDeadline = filterOptions.deadline.substring(0, 10);
		const elDeadline = el.deadline.substring(0, 10);
		return filterDeadline >= elDeadline;
	});
};

const filterListTeams = (filterOptions, list) => {
	return list.filter((el) => {
		if (filterOptions.teams === 'all') return true;
		else if (el.teams.includes(filterOptions.teams)) return true;
		else return false;
	});
};

const filterListCompletion = (filterOptions, list) => {
	return list.filter((el) => {
		if (filterOptions.completion === 'all') return true;
		else if (filterOptions.completion === 'complete' && el.completed) return true;
		else if (filterOptions.completion === 'incomplete' && !el.completed) return true;
		else return false;
	});
};

export const getTaskListTeams = (taskList) => {
	const availableTeams = taskList.map((el) => el.teams).flat();
	return Array.from(new Set(availableTeams)).sort();
};

export default filterList;
