import React from 'react';
import { newTaskBarStyle } from 'styling/newTaskBar';

const NewTaskBar = (props) => {
	return (
		<div classname="newTaskBar" style={newTaskBarStyle}>
			<div>{'New Task Bar'}</div>
		</div>
	);
};

export default NewTaskBar;
