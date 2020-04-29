import React, { useState } from 'react';

const TaskNameInput = (props) => {
	const taskNameInputStyle = {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		padding: '0 1rem'
	};

	const formItemsStyle = {
		margin: '0 0.5rem'
	};

	return (
		<div style={{ ...props.style, ...taskNameInputStyle }}>
			<form>
				<label style={formItemsStyle}>Task Name:</label>
				<input style={formItemsStyle} type="text" name="name" />
				<input type="submit" value="Submit" style={{ display: 'none' }} />
			</form>
		</div>
	);
};

export default TaskNameInput;
