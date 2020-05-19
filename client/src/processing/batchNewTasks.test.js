import { interpretDateTemplate, interpretInstructions, convertTemplateToInstructions } from './batchNewTasks';

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

test('Instructions with double negative operators are interpreted to dates', () => {
	const instructions = [
		{ type: 'date', value: { day: 19, month: 5, year: 2020 } },
		{ type: 'operator', value: '-' },
		{ type: 'operator', value: '-' },
		{ type: 'algebra', value: '2wn' }
	];
	const result = interpretInstructions(instructions, 10);
	const expected = [
		{ day: 19, month: 5, year: 2020 },
		{ day: 2, month: 6, year: 2020 },
		{ day: 16, month: 6, year: 2020 },
		{ day: 30, month: 6, year: 2020 },
		{ day: 14, month: 7, year: 2020 },
		{ day: 28, month: 7, year: 2020 },
		{ day: 11, month: 8, year: 2020 },
		{ day: 25, month: 8, year: 2020 },
		{ day: 8, month: 9, year: 2020 },
		{ day: 22, month: 9, year: 2020 }
	];
	expect(result).toStrictEqual(expected);
});

test('Adding dates, multiple algebra, 3 other op combos', () => {
	const instructions = [
		{ type: 'date', value: { day: 19, month: 5, year: 2020 } },
		{ type: 'operator', value: '-' },
		{ type: 'operator', value: '+' },
		{ type: 'date', value: { day: 9, month: 0, year: 0 } },
		{ type: 'operator', value: '+' },
		{ type: 'operator', value: '-' },
		{ type: 'algebra', value: '3yn' },
		{ type: 'operator', value: '+' },
		{ type: 'operator', value: '+' },
		{ type: 'algebra', value: 'nd' }
	];
	const result = interpretInstructions(instructions, 4);
	const expected = [
		{ day: 10, month: 5, year: 2020 },
		{ day: 11, month: 5, year: 2017 },
		{ day: 12, month: 5, year: 2014 },
		{ day: 13, month: 5, year: 2011 }
	];
	expect(result).toStrictEqual(expected);
});

test('Check if instructions starting with date returns error', () => {
	const dateTemplate = 'nd+${1/1/2020}';
	const expected = 'ERROR: TEMPLATE MUST START WITH DATE';
	const result = interpretDateTemplate(dateTemplate, 3);
	expect(result).toStrictEqual(expected);
});

test('Check if empty instructions returns error', () => {
	const dateTemplate = '';
	const expected = 'ERROR: NO TEMPLATE ENTERED';
	const result = interpretDateTemplate(dateTemplate, 5);
	expect(result).toStrictEqual(expected);
});

test('Check if invalid instructions returns error', () => {
	const dateTemplate = '${1/1/2020}+q';
	const expected = 'ERROR: INVALID TEMPLATE';
	const result = interpretDateTemplate(dateTemplate, 7);
	expect(result).toStrictEqual(expected);
});

test('Check if brackets return an error', () => {
	const dateTemplate = '${1/1/2020}+(nd)';
	const expected = 'ERROR: INVALID TEMPLATE';
	const result = interpretDateTemplate(dateTemplate, 1);
	expect(result).toStrictEqual(expected);
});
