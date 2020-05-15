import { combineParallelArrays, generateEmptyMatrix } from 'processing/utility';

export const interpretTaskTemplate = (taskTemplate, taskCount) => {
	if (taskTemplate) {
		const flags = taskTemplate.match(/\$\{( *[nlNL][^}]*)\}/g);
		const settings = flags.map((el) => convertFlagToSettings(el));
		const strings = settings.map((el) => convertSettingsToStrings(el, taskCount));
		const combinedStrings = combineParallelArrays(strings);
		let taskStrings = [];
		for (let i = 0; i < taskCount; i++) {
			let matchIndex = 0;
			taskStrings[i] = taskTemplate.replace(/\$\{( *[nlNL][^}]*)\}/g, function(s) {
				return combinedStrings[i][matchIndex++] || s;
			});
		}
		console.log(taskStrings);
	}
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
