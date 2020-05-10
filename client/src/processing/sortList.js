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
	const params = { index, reversed: sortOptions.reversed ? -1 : 1 };
	if (type === 'number') taskList = sortObjListNumerically(taskList, params);
	else if (type === 'string') taskList = sortObjListAlphabetically(taskList, params);
	else if (type === 'boolean') taskList = sortObjListNumerically(taskList, params);
	return taskList;
};

const sortObjListNumerically = (list, params) => {
	const { index, reversed } = params;
	return list.sort((a, b) => reversed * Object.values(a)[index] - reversed * Object.values(b)[index]);
};

const sortObjListAlphabetically = (list, params) => {
	const { index, reversed } = params;
	return list.sort((a, b) => (Object.values(a)[index] < Object.values(b)[index] ? -1 * reversed : 1 * reversed));
};
