import React from 'react';

const DataCell = (props) => {
	return (
		<td className={`cell dataCell ${props.className}`} onClick={() => (props.onClick ? props.onClick() : null)}>
			{props.text === true ? '✓' : props.text}
		</td>
	);
};

export default DataCell;
