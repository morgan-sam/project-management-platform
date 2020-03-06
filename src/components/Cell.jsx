import React from 'react';

const Cell = (props) => {
	return (
		<div className="cell" onClick={() => props.onClick()}>
			<div>{props.text === true ? '✓' : props.text} </div>
		</div>
	);
};

export default Cell;
