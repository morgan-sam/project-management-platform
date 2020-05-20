import {
	taskDefaultCell,
	dateDefaultCell,
	deadlineDefaultCell,
	urgencyDefaultCell,
	teamsDefaultCell,
	completedDefaultCell,
	selectedDefaultCell
} from 'styling/table';

import { getGradientTextColor } from 'styling/theme';

export const cellStyles = {
	task: {
		...taskDefaultCell
	},
	date: {
		...dateDefaultCell
	},
	deadline: {
		...deadlineDefaultCell
	},
	urgency: {
		...urgencyDefaultCell
	},
	teams: {
		...teamsDefaultCell
	},
	completed: {
		...completedDefaultCell,
		userSelect: 'none'
	},
	selected: {
		...selectedDefaultCell,
		userSelect: 'none'
	}
};

export const getHighlightCellStyle = (color) => {
	const textColor = getGradientTextColor(color);
	return {
		backgroundColor: color,
		color: textColor
	};
};
