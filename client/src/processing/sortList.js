export const sortList = (options, taskList) => {
	const { sortOptions } = options;
	if (taskList.length === 0) return [];
	if (sortOptions.type === 'task') return sortObjListByTask(taskList, sortOptions.reversed);
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

const sortObjListByTask = (list, reversed) => {
	const tasks = list.slice().map((el) => el.task);
	const sortedTasks = getSortedMixedStringIndices(tasks);
	const newList = sortedTasks.map((task) => {
		const index = list.findIndex((x) => x.task === task);
		return list[index];
	});
	if (reversed) return newList.slice().reverse();
	else return newList;
};

const longestArrayString = (arr) => arr.reduce((a, b) => (a.length > b.length ? a : b));
const numSort = (arr) => arr.slice().sort((a, b) => a - b);

const standardiseMixedValues = (values) => {
	for (let i = 0; i < values.length; i++) {
		if (!isNaN(parseInt(values[i][0]))) values[i].unshift(null);
		if (isNaN(parseInt(values[i][values[i].length - 1]))) values[i].push(Number.MAX_SAFE_INTEGER);
	}
	return values;
};

const getSortedMixedStringIndices = (arr) => {
	let values = arr.map((el) =>
		el.match(/([^0-9]+)|([0-9]+)/g).map((val) => (!isNaN(parseInt(val)) ? parseInt(val) : val))
	);
	values = standardiseMixedValues(values);
	const rounds = longestArrayString(values).length;
	let orders = arr.map(() => '');
	for (let i = 0; i < rounds; i++) {
		const toCompare = values.map((el) => el[i]);
		const sorted = !isNaN(parseInt(toCompare[0])) ? numSort(toCompare.slice()) : toCompare.slice().sort();
		const indices = toCompare.slice().map((el) => sorted.indexOf(el));
		const digits = Math.max(...indices).toString().length;
		indices.forEach((el, a) => {
			if (typeof el === 'number') {
				const elDigits = el.toString().length;
				orders[a] += `${Array(digits - elDigits).fill('0').join('')}${el}`;
			} else {
				orders[a] += el;
			}
		});
	}
	orders = orders.map((el) => parseInt(`1${el}`));
	const sortedOrders = numSort(orders.slice());
	let indices = [];
	for (let i = 0; i < orders.length; i++) {
		const index = orders.indexOf(sortedOrders[i]);
		indices.push(index);
		orders[index] = null;
	}
	return indicesOrderToArray(arr, indices);
};

const indicesOrderToArray = (arr, indices) => {
	let newArray = arr.slice().map(() => null);
	for (let i = 0; i < arr.length; i++) newArray[i] = arr[indices[i]];
	return newArray;
};
