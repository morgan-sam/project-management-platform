export const filterList = (filterOptions, taskList) => {
	let filteredList = taskList;
	filteredList = filteredList.filter((el) => filterOptions.date <= el.date);
	filteredList = filteredList.filter((el) => filterOptions.deadline >= el.deadline);
	filteredList = filterListCompletion(filterOptions, filteredList);
	return filteredList;
};

const filterListCompletion = (filterOptions, list) => {
	return list.filter(function(el) {
		if (filterOptions.completion === 'all') return true;
		else if (filterOptions.completion === 'complete' && el.completed) return true;
		else if (filterOptions.completion === 'incomplete' && !el.completed) return true;
		else return false;
	});
};

export default filterList;
