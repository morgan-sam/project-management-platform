import {
	taskDefaultCell,
	dateDefaultCell,
	deadlineDefaultCell,
	urgencyDefaultCell,
	teamDefaultCell,
	completedDefaultCell,
	selectedDefaultCell
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
	cursor: 'pointer',
	userSelect: 'none'
};

export const selectedCell = {
	...selectedDefaultCell,
	cursor: 'pointer',
	userSelect: 'none'
};
