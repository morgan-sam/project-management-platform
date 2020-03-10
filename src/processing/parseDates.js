export const parseISOToDDMMYYYY = (string) => {
	const stringDate = string.match(/.+?(?=T)/g)[0];
	return stringDate.split('-').reverse().join('/');
};
