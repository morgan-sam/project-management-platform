import React from 'react';
import { cellStyles } from 'styling/dataCell';

const NoDataDisplay = () => {
	const text = 'NO DATA AVAILABLE';

	const headings = [ 'task', 'date', 'deadline', 'urgency', 'teams', 'completed', 'selected' ];

	const emptyCells = () => {
		return headings.map((type) => {
			return <td style={cellStyles[type]}>{text}</td>;
		});
	};

	return (
		<tbody>
			<tr>{emptyCells()}</tr>
		</tbody>
	);
};

export default NoDataDisplay;
