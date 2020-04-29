import React from 'react';

const HeadingCell = (props) => {
	return (
		<th
			className={`headingCell ${props.className}`}
			onClick={() => (props.onClick ? props.onClick() : null)}
			style={props.style}
		>
			{props.text}
		</th>
	);
};

export default HeadingCell;
