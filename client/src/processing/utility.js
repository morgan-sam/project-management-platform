export const capitalizeFirstLetter = (str) => {
	if (str.length > 0) return str[0].toUpperCase() + str.slice(1);
	else return str;
};

export const combineParallelArrays = (matrix) => {
	let singleArray = generateEmptyMatrix(matrix[0].length, matrix[0][0].length - 1);
	for (let a = 0; a < matrix[0].length; a++) {
		for (let b = 0; b < matrix.length; b++) {
			singleArray[a][b] = matrix[b][a];
		}
	}
	return singleArray;
};

export const generateEmptyMatrix = (x, y) => {
	let matrix = [];
	for (let a = 0; a < x; a++) matrix.push([].concat(Array(y)));
	return matrix;
};

export const getNumbersFromString = (string) => {
	const numbers = string.match(/([0-9]+)/g);
	if (!numbers) return null;
	return numbers.map((el) => parseInt(el));
};
