import { combineParallelArrays } from 'processing/utility';
import { getDayFromTodayAsISO } from 'data/dates';
import { parseISOToDateObj, parseDateObjToISO } from 'processing/parseDates';

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
	const output = interpretInstructions(instructions);
	console.log(output);
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
		if (skipCount === regexList.length) return 'ERROR';
	}
	return instructions;
};

const interpretInstructions = (instructions) => {
	const TEST_TASKCOUNT = 5;
	for (let i = 0; i < instructions.length; i++) {
		if (
			instructions[i].type === 'date' &&
			instructions[i + 1].type === 'operator' &&
			instructions[i + 2].type === 'algebra'
		) {
			const { day, month, year } = instructions[i].value;
			const operator = instructions[i + 1].value;
			const algebra = instructions[i + 2].value;
			let { numArray } = getNumbersFromString(algebra);
			let product = numArray.reduce((a, b) => a * b);
			product = operator === '-' ? -product : product;
			let newDate;
			let date = new Date(year, month - 1, day);
			if (algebra.match(/n/g)) product *= TEST_TASKCOUNT;
			if (algebra.match(/d/g)) newDate = date.setDate(date.getDate() + product);
			else if (algebra.match(/m/g)) newDate = addMonths(date, product);
			else if (algebra.match(/y/g)) newDate = date.setFullYear(date.getFullYear() + product);
			return new Date(newDate);
		}
	}
	return 'output';
};

const addMonths = (date, months) => {
	const d = date.getDate();
	date.setMonth(date.getMonth() + +months);
	if (date.getDate() != d) {
		date.setDate(0);
	}
	return date;
};

const getNumbersFromString = (string) => {
	const numbers = string.match(/([0-9]+)/g);
	const numArray = numbers.map((el) => parseInt(el));
	const newString = string.replace(/([0-9]+)/g, '');
	return { newString, numArray };
};

// Date/Deadline Template Options:

// Examples:
// ${today} + nd         =>      (sequential days in a row starting from today)
// ${1/10/20} + n(2m)    =>      (sequential alternative months starting from specified date)
// ${today+2w} - nd      =>      (counts backwards in days starting from a fortnight from today)
// ${t}                  =>      (shorthand version of todays date)
// ${t/t/t}              =>      (exact version of todays date)
// ${1/t/t} + ny         =>      (counts from first day of current month in years)
