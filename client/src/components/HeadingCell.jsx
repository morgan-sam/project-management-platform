import React from 'react';

const HeadingCell = (props) => {
	return (
		<th className={`cell headingCell ${props.className}`} onClick={() => (props.onClick ? props.onClick() : null)}>
			{props.text}
		</th>
	);
};

export default HeadingCell;
