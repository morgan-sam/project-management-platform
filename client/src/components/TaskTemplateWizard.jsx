import React from 'react';
import { cancelButtonStyle, containerStyle } from 'styling/batchNewTasks';

const TaskTemplateWizard = (props) => {
	const { setScreen, colorTheme, setTemplate, template } = props;
	return (
		<div style={containerStyle}>
			<button style={cancelButtonStyle} onClick={() => setScreen('main')}>
				×
			</button>
		</div>
	);
};

export default TaskTemplateWizard;
