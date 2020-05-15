import { combineParallelArrays } from 'processing/utility';
import { getDayFromTodayAsISO } from 'data/dates';
import { parseISOToDateObj } from 'processing/parseDates';

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
	console.log(instructions);
};

const matchDate = (template) => {
	const regex = new RegExp('^\\((?<day>[^)(]+)\\/(?<month>[^)(]+)\\/(?<year>[^)(]+)\\)');
	const dateMatches = template.match(regex);
	if (!dateMatches) return { date: null, dateTemplate: null };
	else {
		const removalRegex = new RegExp('^\\([^)(]+\\/[^)(]+\\/[^)(]+\\)');
		return { date: regex.exec(template).groups, dateTemplate: template.replace(removalRegex, '') };
	}
};

const matchOperator = (template) => {
	const regex = new RegExp('^(\\+|\\-)');
	const operatorMatches = template.match(regex);
	if (!operatorMatches) return { operator: null, operatorTemplate: null };
	else return { operator: regex.exec(template)[0], operatorTemplate: template.replace(regex, '') };
};

const matchNumber = (template) => {
	const regex = new RegExp('^(\\d+|[a-zA-Z])');
	const numberMatches = template.match(regex);
	if (!numberMatches) return { operator: null, numberTemplate: null };
	else return { number: regex.exec(template)[0], numberTemplate: template.replace(regex, '') };
};

const convertTemplateToInstructions = (template) => {
	let instructions = [];
	while (template.length) {
		let { date, dateTemplate } = matchDate(template);
		if (dateTemplate !== null) {
			template = dateTemplate;
			instructions.push({
				type: 'date',
				value: date
			});
		}
		let { operator, operatorTemplate } = matchOperator(template);
		if (operatorTemplate !== null) {
			template = operatorTemplate;
			instructions.push({
				type: 'operator',
				value: operator
			});
		}
		let { number, numberTemplate } = matchNumber(template);
		if (numberTemplate !== null) {
			template = numberTemplate;
			instructions.push({
				type: 'number',
				value: number
			});
		}
	}
	return instructions;
};

// Date/Deadline Template Options:

// Examples:
// (today) + nd         =>      (sequential days in a row starting from today)
// (1/10/20) + n(2m)    =>      (sequential alternative months starting from specified date)
// (today+2w) - nd      =>      (counts backwards in days starting from a fortnight from today)
// (t)                  =>      (shorthand version of todays date)
// (t/t/t)              =>      (exact version of todays date)
// (1/t/t) + ny         =>      (counts from first day of current month in years)
