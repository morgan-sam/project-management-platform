import { combineParallelArrays, generateEmptyMatrix } from 'processing/utility';

export const interpretTaskTemplate = (taskTemplate, taskCount) => {
	if (taskTemplate) {
		const numFlags = taskTemplate.match(/\$\{( *n[^}]*)\}/g);
		// const letterFlags = taskTemplate.match(/\$\{( *l[^}]*)\}/g);
		const numSettings = numFlags.map((el) => convertNumFlagToSettings(el));
		const numStrings = numSettings.map((el) => convertNumSettingsToStrings(el, taskCount));
		const combinedStrings = combineParallelArrays(numStrings);
		let taskStrings = [];
		for (let i = 0; i < taskCount; i++) {
			let matchIndex = 0;
			taskStrings[i] = taskTemplate.replace(/\$\{( *n[^}]*)\}/g, function(s) {
				return combinedStrings[i][matchIndex++] || s;
			});
		}
		console.log(taskStrings);
	}
};

const convertNumSettingsToStrings = (settings, count) => {
	let strings = [];
	const { ascending, digits } = settings;
	for (let i = 0; i < count; i++) {
		const num = ascending ? i : count - i - 1;
		const zeroes = Math.max(0, digits - num.toString().length);
		strings.push(`${'0'.repeat(zeroes)}${num}`);
	}
	return strings;
};

const convertNumFlagToSettings = (flag) => {
	if (!flag) return null;
	const groups = flag.replace(/[\$\{\} ]/g, '').split(',');
	let settings = { digits: 1, ascending: true };
	if (groups[0] !== 'n' && groups[0] !== 'N') return {};
	let orderIndex = 2;
	if (parseInt(groups[1]) >= 0 && parseInt(groups[1]) <= 9) settings.digits = parseInt(groups[1]);
	else orderIndex = 1;
	if (groups[orderIndex] === 'a' || groups[orderIndex] === 'A') settings.ascending = true;
	else if (groups[orderIndex] === 'd' || groups[orderIndex] === 'D') settings.ascending = false;
	return settings;
};
