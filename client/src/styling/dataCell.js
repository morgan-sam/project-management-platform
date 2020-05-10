import {
	taskDefaultCell,
	dateDefaultCell,
	deadlineDefaultCell,
	urgencyDefaultCell,
	teamDefaultCell,
	completedDefaultCell,
	selectionDefaultCell
} from 'styling/table';

export const taskCell = {
	...taskDefaultCell
};

export const dateCell = {
	...dateDefaultCell
};

export const deadlineCell = {
	...deadlineDefaultCell
};

export const urgencyCell = {
	...urgencyDefaultCell
};

export const teamCell = {
	...teamDefaultCell
};

export const completedCell = {
	...completedDefaultCell,
	userSelect: 'none'
};

export const selectionCell = {
	...selectionDefaultCell,
	userSelect: 'none'
};
