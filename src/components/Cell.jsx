import React from 'react';

const Cell = (props) => {
	return (
		<div className="cell">
			<div>{props.text === true ? '✓' : props.text} </div>
		</div>
	);
};

export default Cell;
