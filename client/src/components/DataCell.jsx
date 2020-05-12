import React from 'react';

const DataCell = (props) => {
	return (
		<td
			className={`dataCell ${props.className}`}
			onClick={() => (props.onClick ? props.onClick() : null)}
			style={props.style}
			onMouseOver={(val) => {
				if (props.onMouseOver) props.onMouseOver(val);
			}}
			onMouseLeave={(val) => {
				if (props.onMouseLeave) props.onMouseLeave(val);
			}}
			onMouseDown={() => props.onMouseDown()}
		>
			{props.text === true ? '✓' : props.text}
		</td>
	);
};

export default DataCell;
