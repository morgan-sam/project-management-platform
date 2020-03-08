export const months = () => {
	return [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December'
	];
};

export const get21stCenturyYears = () => {
	return Array.from(Array(100).keys()).map((el) => el + 2000);
};

export const daysInMonth = (month, year) => {
	return new Date(year, month, 0).getDate();
};
