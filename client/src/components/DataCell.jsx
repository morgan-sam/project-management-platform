import React from 'react';

const DataCell = (props) => {
	return (
		<td
			className={`dataCell ${props.className}`}
			onClick={() => (props.onClick ? props.onClick() : null)}
			style={props.style}
		>
			{props.text === true ? '✓' : props.text}
		</td>
	);
};

export default DataCell;
