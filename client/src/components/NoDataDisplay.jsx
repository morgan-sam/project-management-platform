import React from 'react';
import { cellStyles } from 'styling/dataCell';

const NoDataDisplay = (props) => {
	const text = 'NO DATA AVAILABLE';
	const shownFields = Object.entries(props.visibleColumns).flatMap((el) => (el[1] ? el[0] : []));

	const emptyCells = () => {
		return shownFields.map((type, i) => {
			return (
				<td key={i} style={cellStyles[type]}>
					{text}
				</td>
			);
		});
	};

	return (
		<tbody>
			<tr>{emptyCells()}</tr>
		</tbody>
	);
};

export default NoDataDisplay;
