export const sortList = (sortType, taskList) => {
	const index = Object.keys(taskList[0]).indexOf(sortType);
	console.log(index);
	print(taskList);
	const sortedList = sortObjListAlphabetically(taskList, index);
	print(taskList);
	return taskList;
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
