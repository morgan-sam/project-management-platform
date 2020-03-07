export const sortList = (sortOptions, taskList) => {
  const index = Object.keys(taskList[0]).indexOf(sortOptions.type);
  const type = typeof Object.values(taskList[0])[index];
  let list;
  if (type === "number") {
    list = sortObjListNumerically(taskList, index);
  } else if (type === "string") {
    list = sortObjListAlphabetically(taskList, index);
  } else if (type === "boolean") {
    list = sortObjListNumerically(taskList, index);
  }
  if (sortOptions.reversed) return list.reverse();
  else return list;
};

export default sortList;

function sortObjListNumerically(list, index) {
  return list.sort((a, b) => Object.values(a)[index] - Object.values(b)[index]);
}

function sortObjListAlphabetically(list, index) {
  return list.sort((a, b) =>
    Object.values(a)[index] < Object.values(b)[index] ? -1 : 1
  );
}
