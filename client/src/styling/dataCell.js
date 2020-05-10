import {
	taskDefaultCell,
	dateDefaultCell,
	deadlineDefaultCell,
	urgencyDefaultCell,
	teamDefaultCell,
	completedDefaultCell,
	selectionDefaultCell
} from 'styling/table';

import { getHoverTextColor } from 'styling/theme';

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

export const getHighlightCellStyle = (color) => {
	const textColor = getHoverTextColor(color);
	return {
		backgroundColor: color,
		color: textColor
	};
};
