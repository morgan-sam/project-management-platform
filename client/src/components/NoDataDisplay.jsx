import React from 'react';
import { cellStyles } from 'styling/dataCell';
import { fields } from 'data/table';

const NoDataDisplay = () => {
	const text = 'NO DATA AVAILABLE';

	const emptyCells = () => {
		return fields.map((type) => {
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
