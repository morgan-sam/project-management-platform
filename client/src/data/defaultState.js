import { getDayFromTodayAsISO } from 'data/dates';
import { stripISODateOfTime } from 'processing/parseDates';
import { getBoundaryDates } from 'data/dates';

export const filterOptionsDefault = (taskList, active = null) => {
	if (taskList === undefined || taskList.length === 0)
		return {
			active: false,
			date: getDayFromTodayAsISO(0),
			deadline: getDayFromTodayAsISO(14),
			completion: 'all',
			urgency: { min: 1, max: 5 },
			teams: [ 'all' ]
		};
	else {
		const boundaryDates = getBoundaryDates(taskList);
		return {
			active,
			date: stripISODateOfTime(boundaryDates.date),
			deadline: stripISODateOfTime(boundaryDates.deadline),
			completion: 'all',
			urgency: { min: 1, max: 5 },
			teams: [ 'all' ]
		};
	}
};

export const displayBarsAll = (boo) => {
	return {
		filter: boo,
		newTask: boo,
		dataInfo: boo
	};
};
