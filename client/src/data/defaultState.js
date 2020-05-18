import { getDayFromTodayAsISO } from 'data/dates';

export const filterOptionsDefault = () => {
	return {
		active: false,
		date: getDayFromTodayAsISO(0),
		deadline: getDayFromTodayAsISO(14),
		completion: 'all',
		urgency: { min: 1, max: 5 },
		teams: [ 'all' ]
	};
};
