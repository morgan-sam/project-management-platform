import React from 'react';

const DataCell = (props) => {
	return (
		<td
			className={`dataCell ${props.className}`}
			onClick={() => (props.onClick ? props.onClick() : null)}
			style={{ ...props.style, userSelect: 'none' }}
			onMouseOver={(val) => {
				if (props.onMouseOver) props.onMouseOver(val);
			}}
			onMouseLeave={(val) => {
				if (props.onMouseLeave) props.onMouseLeave(val);
			}}
			onMouseDown={(val) => {
				if (props.onMouseDown) props.onMouseDown(val);
			}}
		>
			{props.text === true ? '✓' : props.text}
		</td>
	);
};

export default DataCell;
