export const sortList = (options, taskList) => {
	const { sortOptions } = options;
	if (taskList.length === 0) return [];
	if (sortOptions.type !== 'selected') return sortListByData(sortOptions, taskList);
	else return sortListBySelected(options, taskList);
};
export default sortList;

const sortListBySelected = (options, taskList) => {
	const { sortOptions, selectedTasks } = options;
	const selected = taskList.filter((el) => selectedTasks.includes(el.id));
	const unselected = taskList.filter((el) => !selectedTasks.includes(el.id));
	if (sortOptions.reversed) return [ ...selected, ...unselected ];
	else return [ ...unselected, ...selected ];
};

const sortListByData = (sortOptions, taskList) => {
	const index = Object.keys(taskList[0]).indexOf(sortOptions.type);
	const type = typeof Object.values(taskList[0])[index];
	if (type === 'number') taskList = sortObjListNumerically(taskList, index);
	else if (type === 'string') taskList = sortObjListAlphabetically(taskList, index);
	else if (type === 'boolean') taskList = sortObjListNumerically(taskList, index);
	if (sortOptions.reversed) return taskList.reverse();
	else return taskList;
};

const sortObjListNumerically = (list, index) => {
	return list.sort((a, b) => Object.values(a)[index] - Object.values(b)[index]);
};

const sortObjListAlphabetically = (list, index) => {
	return list.sort((a, b) => (Object.values(a)[index] < Object.values(b)[index] ? -1 : 1));
};
