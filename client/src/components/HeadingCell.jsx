import React from 'react';
import { cellStyle } from 'styling/table';

const HeadingCell = (props) => {
	return (
		<th
			className={`headingCell ${props.className}`}
			onClick={() => (props.onClick ? props.onClick() : null)}
			style={cellStyle}
		>
			{props.text}
		</th>
	);
};

export default HeadingCell;
