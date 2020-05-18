import {
	taskDefaultCell,
	dateDefaultCell,
	deadlineDefaultCell,
	urgencyDefaultCell,
	teamsDefaultCell,
	completedDefaultCell,
	selectionDefaultCell
} from 'styling/table';

import { getGradientTextColor } from 'styling/theme';

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

export const teamsCell = {
	...teamsDefaultCell
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
	const textColor = getGradientTextColor(color);
	return {
		backgroundColor: color,
		color: textColor
	};
};
