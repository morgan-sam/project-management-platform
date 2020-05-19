import { getDayFromTodayAsISO } from 'data/dates';
import { parseISOToDateObj, parseECMADateToDateObj } from 'processing/parseDates';

////////////////////////////////////////////////

export const interpretDateTemplate = (dateTemplate, taskCount) => {
	const instructions = convertTemplateToInstructions(dateTemplate);
	if (typeof instructions === 'string') return instructions;
	const dateArray = interpretInstructions(instructions, taskCount);
	return dateArray;
};

const retrieveInstructionFromTemplate = (template, regex) => {
	const matches = template.match(regex);
	if (!matches) return { value: null, newTemplate: null };
	else
		return {
			value: regex.exec(template).groups ? regex.exec(template).groups : regex.exec(template)[0],
			newTemplate: template.replace(regex, '')
		};
};

const regexList = [
	{ type: 'date', regex: new RegExp('^\\$\\{(?<day>[^${}]+)\\/(?<month>[^${}]+)\\/(?<year>[^${}]+)\\}') },
	{ type: 'date', regex: new RegExp('^\\$\\{t\\}'), default: parseISOToDateObj(getDayFromTodayAsISO()) },
	{ type: 'operator', regex: new RegExp('^(\\+|\\-)') },
	{ type: 'algebra', regex: new RegExp('^([ndwmy0-9]+)') }
];

const convertTemplateToInstructions = (template) => {
	let instructions = [];
	while (template.length) {
		let skipCount = 0;
		for (let i = 0; i < regexList.length; i++) {
			let { value, newTemplate } = retrieveInstructionFromTemplate(template, regexList[i].regex);
			if (newTemplate !== null) {
				template = newTemplate;
				instructions.push({
					type: regexList[i].type,
					value: regexList[i].default ? regexList[i].default : value
				});
			} else skipCount++;
		}
		if (skipCount === regexList.length) return 'ERROR: INVALID TEMPLATE';
	}
	if (instructions.length === 0) return 'ERROR: NO TEMPLATE ENTERED';
	if (instructions[0].type !== 'date') return 'ERROR: TEMPLATE MUST START WITH DATE';
	instructions = instructions.map(
		(el) => (el.type === 'date' ? { type: 'date', value: getDateWithExactValues(el.value) } : el)
	);
	return instructions;
};

const interpretInstructions = (instructions, taskCount) => {
	let stringArray = [];
	for (let task = 0; task < taskCount; task++) {
		let [ previous, operator ] = new Array(2).fill(null);
		for (let i = 0; i < instructions.length; i++) {
			const { type, value } = instructions[i];
			if ((type === 'date' || type === 'algebra') && previous === null) previous = instructions[i];
			else if (type === 'operator') operator = interpretOperatorInstructions(operator, value);
			else if (previous && operator) {
				previous = sumInstructions(instructions[i], previous, operator, task);
				operator = null;
			}
		}
		stringArray.push(previous.value);
	}
	return stringArray;
};

const sumInstructions = (current, previous, operator, task) => {
	const { type, value } = current;
	// template must start with date so previous type for algebra will always be date
	if (type === 'algebra')
		return { value: calculateDateWithAlgebra(previous.value, operator, value, task), type: 'date' };
	else if (type === 'date') {
		if (previous.type === 'date') return { value: addSubtractDates(previous.value, value, operator), type: 'date' };
		else if (previous.type === 'algebra')
			return { value: calculateDateWithAlgebra(value, operator, previous.value, task), type: 'date' };
	}
};

const interpretOperatorInstructions = (operator, value) => {
	if (operator === '-' && value === '-') return '+';
	else if (operator === '-' && value === '+') return '-';
	else if (operator === '+' && value === '-') return '-';
	else return value;
};

const addSubtractDates = (dateOne, dateTwo, operator) => {
	const sign = operator === '-' ? -1 : 1;
	let date = new Date(dateOne.year, dateOne.month - 1, dateOne.day);
	date = new Date(date.setDate(date.getDate() + parseInt(dateTwo.day) * sign));
	date = addMonths(date, parseInt(dateTwo.month) * sign);
	date = new Date(date.setFullYear(date.getFullYear() + parseInt(dateTwo.year) * sign));
	return parseECMADateToDateObj(date);
};

const calculateDateWithAlgebra = (date, operator, algebra, task) => {
	const { day, month, year } = date;
	const product = getProductFromAlgebra(operator, algebra, task);
	date = new Date(year, month - 1, day);
	date = getDateFromAlgebra(date, algebra, product);
	return parseECMADateToDateObj(new Date(date));
};

const getProductFromAlgebra = (operator, algebra, task) => {
	const numArray = getNumbersFromString(algebra);
	let product = numArray ? numArray.reduce((a, b) => a * b) : 1;
	product = operator === '-' ? -product : product;
	if (algebra.match(/n/g)) product *= task;
	return product;
};

const getDateFromAlgebra = (date, algebra, product) => {
	if (algebra.match(/d/g)) date = date.setDate(date.getDate() + product);
	else if (algebra.match(/w/g)) date = date.setDate(date.getDate() + product * 7);
	else if (algebra.match(/m/g)) date = addMonths(date, product);
	else if (algebra.match(/y/g)) date = date.setFullYear(date.getFullYear() + product);
	return date;
};

const getDateWithExactValues = (date) => {
	const today = new Date();
	return {
		day: date.day === 't' ? today.getDate() : date.day,
		month: date.month === 't' ? today.getMonth() + 1 : date.month,
		year: date.year === 't' ? today.getFullYear() : date.year
	};
};

const addMonths = (date, months) => {
	const d = date.getDate();
	date.setMonth(date.getMonth() + +months);
	if (date.getDate() != d) date.setDate(0);
	return date;
};

const getNumbersFromString = (string) => {
	const numbers = string.match(/([0-9]+)/g);
	if (!numbers) return null;
	const numArray = numbers.map((el) => parseInt(el));
	return numArray;
};

export const testFunctions = {
	interpretDateTemplate,
	interpretInstructions
};
