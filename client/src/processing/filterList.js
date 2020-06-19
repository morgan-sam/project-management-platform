export const filterList = (filterOptions, taskList) => {
	let filteredList = taskList;
	let filterFunctions = [
		filterListDate,
		filterListDeadline,
		filterListMinUrgency,
		filterListMaxUrgency,
		filterListTeams,
		filterListCompletion
	];
	for (let i = 0; i < filterFunctions.length; i++) filteredList = filterFunctions[i](filterOptions, filteredList);
	return filteredList;
};

export const filterListDate = (filterOptions, list) => list.filter((el) => filterOptions.date <= el.date);

export const filterListDeadline = (filterOptions, list) => {
	return list.filter((el) => {
		const filterDeadline = filterOptions.deadline.substring(0, 10);
		const elDeadline = el.deadline.substring(0, 10);
		return filterDeadline >= elDeadline;
	});
};

export const filterListMinUrgency = (filterOptions, list) =>
	list.filter((el) => filterOptions.urgency.min <= el.urgency);

export const filterListMaxUrgency = (filterOptions, list) =>
	list.filter((el) => filterOptions.urgency.max >= el.urgency);

const filterListTeams = (filterOptions, list) => {
	return list.filter((el) => {
		if (filterOptions.teams.includes('all')) return true;
		else if (el.teams.some((team) => filterOptions.teams.includes(team))) return true;
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

export default filterList;
