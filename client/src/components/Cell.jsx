import React from 'react';

const Cell = (props) => {
	return (
		<div className={`cell ${props.className}`} onClick={() => (props.onClick ? props.onClick() : null)}>
			<div>{props.text === true ? '✓' : props.text} </div>
		</div>
	);
};

export default Cell;
