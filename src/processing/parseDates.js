export const parseISOToLittleEndian = (string) => {
	const stringDate = string.match(/.+?(?=T)/g)[0];
	return stringDate.split('-').reverse().join('/');
};

export const parseDateObjToISO = (obj) => {
	const dayString = obj.day >= 10 ? obj.day.toString() : '0' + obj.day.toString();
	const monthString = obj.month >= 10 ? obj.month.toString() : '0' + obj.month.toString();
	return `${obj.year}-${monthString}-${dayString}T00:00:00.000Z`;
};
