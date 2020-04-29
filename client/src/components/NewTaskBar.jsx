import React, { useState } from 'react';
import { newTaskBarStyle } from 'styling/newTaskBar';

const NewTaskBar = (props) => {
	const taskBarHidden = {
		margin: '-8px 0',
		height: '0',
		opacity: '0'
	};
	const taskBarVisible = {
		height: '5rem',
		opacity: '1'
	};

	return (
		<div
			classname="newTaskBar"
			style={{
				...props.style,
				...newTaskBarStyle,
				...(props.displayNewTaskBar ? taskBarHidden : taskBarVisible)
			}}
		>
			<div>{'New Task Bar'}</div>
		</div>
	);
};

export default NewTaskBar;
