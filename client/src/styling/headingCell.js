import {
	taskDefaultCell,
	dateDefaultCell,
	deadlineDefaultCell,
	urgencyDefaultCell,
	teamsDefaultCell,
	completedDefaultCell,
	selectedDefaultCell
} from 'styling/table';

export const headingCellStyles = {
	task: { ...taskDefaultCell },
	date: { ...dateDefaultCell },
	deadline: { ...deadlineDefaultCell },
	urgency: { ...urgencyDefaultCell },
	teams: { ...teamsDefaultCell },
	completed: { ...completedDefaultCell },
	selected: { ...selectedDefaultCell }
};
