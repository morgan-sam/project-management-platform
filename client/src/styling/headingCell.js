import {
	taskDefaultCell,
	dateDefaultCell,
	deadlineDefaultCell,
	urgencyDefaultCell,
	teamsDefaultCell,
	completedDefaultCell,
	selectionDefaultCell
} from 'styling/table';

export const headingCellStyles = {
	task: { ...taskDefaultCell },
	date: { ...dateDefaultCell },
	deadline: { ...deadlineDefaultCell },
	urgency: { ...urgencyDefaultCell },
	teams: { ...teamsDefaultCell },
	completed: { ...completedDefaultCell },
	selected: { ...selectionDefaultCell }
};
