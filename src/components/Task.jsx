import React from 'react';

const Task = (props) => {
	return (
		<div className="taskEntry">
			<h3>Task: {props.task}</h3>
			<h3>Date: {props.date}</h3>
			<h3>Deadline: {props.deadline}</h3>
			<h3>Urgency: {props.urgency}</h3>
			<h3>Team: {props.team}</h3>
		</div>
	);
};

export default Task;
