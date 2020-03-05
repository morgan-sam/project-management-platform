import React from 'react';

const Cell = (props) => {
	return (
		<div className="cell">
			<div>{props.text}</div>
		</div>
	);
};

export default Cell;
