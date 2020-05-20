// PARSE DATES OBJECT DATES : {date,month,year}

export const parseDateObjToLittleEndian = (dateObj) => {
	return `${dateObj.day}/${dateObj.month}/${dateObj.year}`;
};

export const parseDateObjToISO = (obj) => {
	const dayString = obj.day >= 10 ? obj.day.toString() : '0' + obj.day.toString();
	const monthString = obj.month >= 10 ? obj.month.toString() : '0' + obj.month.toString();
	return `${obj.year}-${monthString}-${dayString}T00:00:00.000Z`;
};

// PARSE ECMA DATES : new Date()

export const parseECMADateToDateObj = (ECMADate) => {
	return { day: ECMADate.getDate(), month: ECMADate.getMonth() + 1, year: ECMADate.getFullYear() };
};

export const parseECMADateToLittleEndian = (ECMADate) => {
	return `${ECMADate.getDate()}/${ECMADate.getMonth()}/${ECMADate.getFullYear()}`;
};

// PARSE LITTLE ENDIAN DATES : 1/1/2020

export const parseLittleEndianToISOTime = (littleEndian) => {
	const date = littleEndian.split('/');
	return `${date[2]}-${date[1]}-${date[0]}T00:00:00.000Z`;
};

// PARSE ISO DATES : 2020-01-01T00:00:00Z

export const parseISOToDateObj = (string) => {
	const stringDate = string.match(/.+?(?=T)/g)[0];
	const dateSplitString = stringDate.split('-').reverse();
	const dateArray = dateSplitString.map((el) => parseInt(el));
	return { day: dateArray[0], month: dateArray[1], year: dateArray[2] };
};

export const parseISOToLittleEndian = (string) => {
	const stringDate = string.match(/.+?(?=T)/g)[0];
	return stringDate.split('-').reverse().join('/');
};

export const stripISODateOfTime = (iso) => {
	const dateOnly = iso.match(/.+?(?=T)/g)[0];
	return `${dateOnly}T00:00:00.000Z`;
};
