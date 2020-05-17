import React from 'react';
import BatchNewTasks from 'components/BatchNewTasks';

import { cancelButtonStyle, containerStyle } from 'styling/batchNewTasks';

const DateTemplateWizard = (props) => {
	const { setScreen } = props;

	return (
		<div
			style={{
				...containerStyle,
				height: '10rem',
				width: '20rem'
			}}
		>
			<button style={cancelButtonStyle} onClick={() => setScreen('main')}>
				×
			</button>
		</div>
	);
};

export default DateTemplateWizard;
