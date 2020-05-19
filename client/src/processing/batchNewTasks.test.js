import { interpretDateTemplate } from './batchNewTasks';

test('Check for 3 day date template', () => {
	const dateTemplate = '${1/1/2020}+nd';
	const expected = [
		{
			day: 1,
			month: 1,
			year: 2020
		},
		{
			day: 2,
			month: 1,
			year: 2020
		},
		{
			day: 3,
			month: 1,
			year: 2020
		}
	];
	const result = interpretDateTemplate(dateTemplate, 3);
	expect(result).toStrictEqual(expected);
});
