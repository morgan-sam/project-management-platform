import { interpretDateTemplate } from './batchNewTasks';

test('Check 3 sequential days date template', () => {
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

test('Check fortnights backward 4 times date template', () => {
	const dateTemplate = '${30/1/2080}-2nw';
	const expected = [
		{
			day: 30,
			month: 1,
			year: 2080
		},
		{
			day: 16,
			month: 1,
			year: 2080
		},
		{
			day: 2,
			month: 1,
			year: 2080
		},
		{
			day: 19,
			month: 12,
			year: 2079
		}
	];
	const result = interpretDateTemplate(dateTemplate, 4);
	expect(result).toStrictEqual(expected);
});
