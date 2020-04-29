import React from 'react';
import { cellStyle } from 'styling/table';

const DataCell = (props) => {
	return (
		<td
			className={`dataCell ${props.className}`}
			onClick={() => (props.onClick ? props.onClick() : null)}
			style={cellStyle}
		>
			{props.text === true ? '✓' : props.text}
		</td>
	);
};

export default DataCell;
