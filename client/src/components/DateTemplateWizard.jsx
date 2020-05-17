import React from 'react';
import BatchNewTasks from 'components/BatchNewTasks';

import { cancelButtonStyle } from 'styling/batchNewTasks';

const DateTemplateWizard = (props) => {
	const { setPopUp, colorTheme, setDataChanged } = props;

	const containerStyle = {
		position: 'fixed',
		height: '14rem',
		width: '20rem',
		backgroundColor: 'white',
		border: '1px solid black',
		top: '50vh',
		left: '50vw',
		transform: 'translate(-50%,-50%)',
		zIndex: '10',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center'
	};

	return (
		<div style={containerStyle}>
			<button
				style={cancelButtonStyle}
				onClick={() =>
					setPopUp(
						<BatchNewTasks colorTheme={colorTheme} setPopUp={setPopUp} setDataChanged={setDataChanged} />
					)}
			>
				×
			</button>
		</div>
	);
};

export default DateTemplateWizard;
