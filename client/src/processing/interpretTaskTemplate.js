import { combineParallelArrays } from 'processing/utility';

export const interpretTaskTemplate = (taskTemplate, taskCount) => {
	if (taskTemplate) {
		const flags = taskTemplate.match(/\$\{( *[nlNL][^}]*)\}/g);
		if (!flags) return 'ERROR: INVALID TEMPLATE';
		const settings = flags.map((el) => convertFlagToSettings(el));
		const strings = settings.map((el) => convertSettingsToStrings(el, taskCount));
		const combinedStrings = combineParallelArrays(strings);
		return getFullTaskStrings(combinedStrings, taskTemplate);
	} else return 'ERROR: TEMPLATE NOT ENTERED';
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
	for (let i = 0; i < count; i++) {
		const loop = { i, count };
		if (settings.numerical) strings.push(convertNumSettingToString(settings, loop));
		else strings.push(convertLetterSettingToString(settings, loop));
	}
	return strings;
};

const convertNumSettingToString = (settings, loop) => {
	const { i, count } = loop;
	const { ascending, digits } = settings;
	const num = ascending ? i : count - i - 1;
	const zeroes = Math.max(0, digits - num.toString().length);
	return `${'0'.repeat(zeroes)}${num}`;
};

const convertLetterSettingToString = (settings, loop) => {
	const { i, count } = loop;
	const { ascending } = settings;
	const num = ascending ? i % 26 : 25 - i % 26;
	const alphaIteration = Math.floor(i / 26);
	return `${String.fromCharCode(97 + num)}${count > 26 ? alphaIteration : ''}`;
};

const convertFlagToSettings = (flag) => {
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
