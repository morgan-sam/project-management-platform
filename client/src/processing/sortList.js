export const sortList = (options, taskList) => {
    const { sortOptions } = options;
    if (taskList.length === 0) return [];
    if (sortOptions.type !== 'selected')
        return sortListByType(taskList, sortOptions);
    else return sortListBySelected(options, taskList);
};
export default sortList;

const sortListBySelected = (options, taskList) => {
    const { sortOptions, selectedTasks } = options;
    const selected = taskList.filter((el) => selectedTasks.includes(el.id));
    const unselected = taskList.filter((el) => !selectedTasks.includes(el.id));
    if (sortOptions.reversed) return [...selected, ...unselected];
    else return [...unselected, ...selected];
};

const sortListByType = (taskList, sortOptions) => {
    const index = Object.keys(taskList[0]).indexOf(sortOptions.type);
    const type = typeof Object.values(taskList[0])[index];
    taskList = sortObjListAlphabetically(taskList.slice(), {
        type: 'task',
        reversed: false
    });
    if (Array.isArray(Object.values(taskList[0])[index]))
        return sortObjListAlphabetically(taskList.slice(), sortOptions);
    else if (type === 'number')
        return sortObjListNumerically(taskList, sortOptions);
    else if (type === 'string')
        return sortObjListAlphabetically(taskList, sortOptions);
    else if (type === 'boolean')
        return sortObjListNumerically(taskList, sortOptions);
    else return taskList;
};

const sortListAlphabetically = (list) => {
    return list.sort((a, b) => (Object.values(a) < Object.values(b) ? -1 : 1));
};

const sortObjListNumerically = (list, sortOptions) => {
    const index = Object.keys(list[0]).indexOf(sortOptions.type);
    const reversed = sortOptions.reversed ? -1 : 1;
    return list.sort(
        (a, b) =>
            reversed * Object.values(a)[index] -
            reversed * Object.values(b)[index]
    );
};

const sortObjListAlphabetically = (list, sortOptions) => {
    const { reversed, type } = sortOptions;
    const { usingArrays, sortedSub } = sortObjListSubArray(list, type);
    let newList = [];
    for (let i = 0; i < list.length; i++) {
        const index = list.findIndex((x) => {
            if (x === null) return false;
            return (
                (usingArrays ? x[type].toString() : x[type]) === sortedSub[i]
            );
        });
        newList[i] = list[index];
        list[index] = null;
    }
    if (reversed) return newList.slice().reverse();
    else return newList;
};

const sortObjListSubArray = (list, type) => {
    let usingArrays = false;
    const sub = list.slice().map((el) => {
        if (Array.isArray(el[type])) {
            usingArrays = true;
            return sortListAlphabetically(el[type]).toString();
        } else return el[type];
    });
    const sortedSub = sortMixedStringArray(sub);
    return { usingArrays, sortedSub };
};

const longestArrayString = (arr) =>
    arr.reduce((a, b) => (a.length > b.length ? a : b));
const numSort = (arr) => arr.slice().sort((a, b) => a - b);

const standardiseMixedValues = (values) => {
    for (let i = 0; i < values.length; i++) {
        if (!isNaN(parseInt(values[i][0]))) values[i].unshift(null);
        if (isNaN(parseInt(values[i][values[i].length - 1])))
            values[i].push(Number.MAX_SAFE_INTEGER);
    }
    return values;
};

const sortMixedStringArray = (arr) => {
    let values = arr.map((el) =>
        el
            .match(/([^0-9]+)|([0-9]+)/g)
            .map((val) => (!isNaN(parseInt(val)) ? parseInt(val) : val))
    );
    values = standardiseMixedValues(values);
    const rounds = longestArrayString(values).length;
    let orders = arr.map(() => '');
    for (let i = 0; i < rounds; i++) {
        const toCompare = values.map((el) =>
            typeof el[i] === 'string' ? el[i].toLowerCase() : el[i]
        );
        const sorted = !isNaN(parseInt(toCompare[0]))
            ? numSort(toCompare.slice())
            : toCompare.slice().sort();
        const indices = toCompare.slice().map((el) => sorted.indexOf(el));
        const digits = Math.max(...indices).toString().length;
        indices.forEach((el, a) => {
            if (typeof el === 'number') {
                const elDigits = el.toString().length;
                orders[a] += `${Array(digits - elDigits)
                    .fill('0')
                    .join('')}${el}`;
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
