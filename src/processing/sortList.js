export const sortList = (sortType, taskList) => {
	const index = Object.keys(taskList[0]).indexOf(sortType);
	const type = typeof Object.values(taskList[0])[index];
	if (type === 'number') {
		return sortObjListNumerically(taskList, index);
	} else if (type === 'string') {
		return sortObjListAlphabetically(taskList, index);
	} else if (type === 'boolean') {
		return sortObjListNumerically(taskList, index);
	}
};

export default sortList;

const print = (value) => {
	console.log(JSON.parse(JSON.stringify(value)));
};

function sortObjListNumerically(list, index) {
	return list.sort((a, b) => Object.values(a)[index] - Object.values(b)[index]);
}

function sortObjListAlphabetically(list, index) {
	return list.sort((a, b) => (Object.values(a)[index] < Object.values(b)[index] ? -1 : 1));
}
