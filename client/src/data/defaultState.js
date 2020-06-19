import { getDayFromTodayAsISO } from 'data/dates';
import { stripISODateOfTime } from 'processing/dates';
import { getBoundaryDates } from 'data/dates';

export const filterOptionsDefault = (taskList, active = null) => {
	if (taskList === undefined || taskList.length === 0)
		return {
			active: false,
			date: getDayFromTodayAsISO(0),
			deadline: getDayFromTodayAsISO(14),
			completion: 'all',
			urgency: { min: 1, max: 5 },
			teams: [ 'all' ],
			teamMatch: 'AND'
		};
	else {
		const boundaryDates = getBoundaryDates(taskList);
		return {
			active,
			date: stripISODateOfTime(boundaryDates.date),
			deadline: stripISODateOfTime(boundaryDates.deadline),
			completion: 'all',
			urgency: { min: 1, max: 5 },
			teams: [ 'all' ],
			teamMatch: 'AND'
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

export const visibleColumnsDefault = {
	id: false,
	task: true,
	date: true,
	deadline: true,
	urgency: true,
	teams: true,
	completed: true,
	selected: true
};

export const defaultPreferences = {
	startupSplash: true
};

export const defaultBatchNewTasksTemplate = {
	count: 10,
	task: 'Task_${n}',
	date: '${t}',
	deadline: '${t}+2w',
	urgency: 3,
	teams: [ 'Team1', 'Team2', 'Team3' ]
};
