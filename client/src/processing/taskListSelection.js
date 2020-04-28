export const checkIfAllSelectedAreComplete = (rawTaskList, selectedTasks) => {
	const selectedItems = rawTaskList.filter((el) => selectedTasks.includes(el.id));
	return Boolean(selectedItems.length) && selectedItems.length === selectedItems.filter((el) => el.completed).length;
};

export const getAllIds = (rawTaskList) => {
	return rawTaskList.map((el) => el.id);
};

export const checkIfAllTasksSelected = (rawTaskList, selectedTasks) => {
	return getAllIds(rawTaskList).length !== selectedTasks.length;
};
