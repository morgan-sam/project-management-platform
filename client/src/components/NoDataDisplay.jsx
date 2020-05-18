import React from 'react';
import {
	taskCell,
	dateCell,
	deadlineCell,
	urgencyCell,
	teamsCell,
	completedCell,
	selectionCell
} from 'styling/dataCell';

const NoDataDisplay = () => {
	const text = 'NO DATA AVAILABLE';

	return (
		<tbody>
			<tr>
				<td style={taskCell}>{text}</td>
				<td style={dateCell}>{text}</td>
				<td style={deadlineCell}>{text}</td>
				<td style={urgencyCell}>{text}</td>
				<td style={teamsCell}>{text}</td>
				<td style={completedCell}>{text}</td>
				<td style={selectionCell}>{text}</td>
			</tr>
		</tbody>
	);
};

export default NoDataDisplay;
