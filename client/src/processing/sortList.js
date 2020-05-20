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
	const params = { index, reversed: sortOptions.reversed ? -1 : 1, type };
	taskList = sortObjListByTask(taskList, params);
	return sortListByType(taskList, params);
};

const sortListByType = (taskList, params) => {
	if (params.type === 'number') return sortObjListNumerically(taskList, params);
	else if (params.type === 'string') return sortObjListAlphabetically(taskList, params);
	else if (params.type === 'boolean') return sortObjListNumerically(taskList, params);
	else return taskList;
};

const sortObjListNumerically = (list, params) => {
	const { index, reversed } = params;
	return list.sort((a, b) => reversed * Object.values(a)[index] - reversed * Object.values(b)[index]);
};

const sortObjListAlphabetically = (list, params) => {
	const { index, reversed } = params;
	return list.sort((a, b) => (Object.values(a)[index] < Object.values(b)[index] ? -1 * reversed : 1 * reversed));
};

const sortObjListByTask = (list, params) => {
	const { reversed } = params;
	return list.sort((a, b) => (a.task < b.task ? -1 * reversed : 1 * reversed));
};
