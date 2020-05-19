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

test('Check 100s of years', () => {
	const dateTemplate = '${1/1/1020}+100yn';
	const expected = [
		{
			day: 1,
			month: 1,
			year: 1020
		},
		{
			day: 1,
			month: 1,
			year: 1120
		},
		{
			day: 1,
			month: 1,
			year: 1220
		},
		{
			day: 1,
			month: 1,
			year: 1320
		},
		{
			day: 1,
			month: 1,
			year: 1420
		},
		{
			day: 1,
			month: 1,
			year: 1520
		},
		{
			day: 1,
			month: 1,
			year: 1620
		},
		{
			day: 1,
			month: 1,
			year: 1720
		},
		{
			day: 1,
			month: 1,
			year: 1820
		},
		{
			day: 1,
			month: 1,
			year: 1920
		},
		{
			day: 1,
			month: 1,
			year: 2020
		}
	];
	const result = interpretDateTemplate(dateTemplate, 11);
	expect(result).toStrictEqual(expected);
});
