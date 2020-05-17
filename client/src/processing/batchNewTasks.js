import { combineParallelArrays } from 'processing/utility';
import { getDayFromTodayAsISO } from 'data/dates';
import { parseISOToDateObj, parseDateObjToLittleEndian, parseECMADateToDateObj } from 'processing/parseDates';

export const interpretTaskTemplate = (taskTemplate, taskCount) => {
	if (taskTemplate) {
		const flags = taskTemplate.match(/\$\{( *[nlNL][^}]*)\}/g);
		const settings = flags.map((el) => convertFlagToSettings(el));
		const strings = settings.map((el) => convertSettingsToStrings(el, taskCount));
		const combinedStrings = combineParallelArrays(strings);
		return getFullTaskStrings(combinedStrings, taskTemplate);
	} else return null;
};

const getFullTaskStrings = (strings, template) => {
	let taskStrings = [];
	for (let i = 0; i < strings.length; i++) {
		let matchIndex = 0;
		taskStrings[i] = template.replace(/\$\{( *[nlNL][^}]*)\}/g, function(s) {
			return strings[i][matchIndex++] || s;
		});
	}
	return taskStrings;
};

const convertSettingsToStrings = (settings, count) => {
	let strings = [];
	const { ascending, digits } = settings;
	for (let i = 0; i < count; i++) {
		if (settings.numerical) {
			const num = ascending ? i : count - i - 1;
			const zeroes = Math.max(0, digits - num.toString().length);
			strings.push(`${'0'.repeat(zeroes)}${num}`);
		} else {
			const num = ascending ? i % 26 : 25 - i % 26;
			const alphaIteration = Math.floor(i / 26);
			strings.push(`${String.fromCharCode(97 + num)}${count > 26 ? alphaIteration : ''}`);
		}
	}
	return strings;
};

const convertFlagToSettings = (flag) => {
	if (!flag) return null;
	const groups = flag.replace(/[\$\{\} ]/g, '').split(',');
	let settings = { numerical: true, digits: 1, ascending: true };
	let orderIndex = 2;
	if (groups[0] === 'l' || groups[0] === 'L') {
		orderIndex = 1;
		settings.numerical = false;
	} else if (parseInt(groups[1]) >= 0 && parseInt(groups[1]) <= 9) settings.digits = parseInt(groups[1]);
	else orderIndex = 1;
	if (groups[orderIndex] === 'a' || groups[orderIndex] === 'A') settings.ascending = true;
	else if (groups[orderIndex] === 'd' || groups[orderIndex] === 'D') settings.ascending = false;
	return settings;
};

////////////////////////////////////////////////

export const interpretDateTemplate = (dateTemplate, taskCount) => {
	const instructions = convertTemplateToInstructions(dateTemplate);
	if (typeof instructions === 'string') {
		console.log(instructions);
		return null;
	}
	const dateArray = interpretInstructions(instructions, taskCount);
	const stringDateArray = dateArray.map((el) => parseDateObjToLittleEndian(el));
	console.log(stringDateArray);
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
	{ type: 'algebra', regex: new RegExp('^([a-zA-Z0-9]+)') },
	{ type: 'brackets', regex: new RegExp('^(\\(.*\\))') }
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
	console.log(instructions);
	let stringArray = [];
	for (let task = 0; task < taskCount; task++) {
		let [ previous, operator ] = new Array(2).fill(null);
		for (let i = 0; i < instructions.length; i++) {
			const { type, value } = instructions[i];
			if ((type === 'date' || type === 'algebra') && previous === null) previous = instructions[i];
			else if (type === 'operator') {
				if (operator === '-' && value === '-') operator = '+';
				else if (operator === '-' && value === '+') operator = '-';
				else if (operator === '+' && value === '-') operator = '-';
				else operator = value;
			} else if (type === 'algebra' && previous && operator) {
				// template must start with date so previous type for algebra will always be date
				previous = { value: calculateDateWithAlgebra(previous.value, operator, value, task), type: 'date' };
				operator = null;
			} else if (type === 'date' && previous && operator) {
				if (previous.type === 'date') {
					previous = { value: addSubtractDates(previous.value, value, operator), type: 'date' };
					operator = null;
				} else if (previous.type === 'algebra') {
					previous = { value: calculateDateWithAlgebra(value, operator, previous.value, task), type: 'date' };
					operator = null;
				}
			}
		}
		stringArray.push(previous.value);
	}
	return stringArray;
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
	let numArray = getNumbersFromString(algebra);
	let product = numArray ? numArray.reduce((a, b) => a * b) : 1;
	product = operator === '-' ? -product : product;
	date = new Date(year, month - 1, day);
	if (algebra.match(/n/g)) product *= task;
	if (algebra.match(/d/g)) date = date.setDate(date.getDate() + product);
	else if (algebra.match(/w/g)) date = date.setDate(date.getDate() + product * 7);
	else if (algebra.match(/m/g)) date = addMonths(date, product);
	else if (algebra.match(/y/g)) date = date.setFullYear(date.getFullYear() + product);
	return parseECMADateToDateObj(new Date(date));
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

// Date/Deadline Template Options:

// Examples:
// ${today} + nd         =>      (sequential days in a row starting from today)
// ${1/10/20} + n(2m)    =>      (sequential alternative months starting from specified date)
// ${today+2w} - nd      =>      (counts backwards in days starting from a fortnight from today)
// ${t}                  =>      (shorthand version of todays date)
// ${t/t/t}              =>      (exact version of todays date)
// ${1/t/t} + ny         =>      (counts from first day of current month in years)
