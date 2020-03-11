export const filterList = (filterOptions, taskList) => {
	let filteredList = taskList;
	filteredList = filteredList.filter((el) => filterOptions.date <= el.date);
	filteredList = filteredList.filter((el) => filterOptions.deadline >= el.deadline);
	return filteredList;
};

export default filterList;
