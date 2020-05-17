import React from 'react';
import BatchNewTasks from 'components/BatchNewTasks';

import { cancelButtonStyle } from 'styling/batchNewTasks';

const DateTemplateWizard = (props) => {
	const { setScreen } = props;

	const containerStyle = {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		position: 'fixed',
		justifyContent: 'center',
		top: '50vh',
		left: '50vw',
		height: '10rem',
		width: '20rem',
		border: '1px solid black',
		transform: 'translate(-50%,-50%)',
		backgroundColor: 'white',
		zIndex: '10',
		padding: '2rem'
	};

	return (
		<div style={containerStyle}>
			<button style={cancelButtonStyle} onClick={() => setScreen('main')}>
				×
			</button>
		</div>
	);
};

export default DateTemplateWizard;
