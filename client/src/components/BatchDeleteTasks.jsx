import React, { useState } from 'react';
import {
	titleStyle,
	popUpPositionStyle,
	topContainerStyle,
	popUpWindowStyle,
	subContainerStyle,
	cancelButtonStyle,
	errorTextStyle,
	topRowStyle,
	finalContainerStyle
} from 'styling/popUp';
import ColorButton from 'components/ColorButton';

const BatchDeleteTasks = (props) => {
	const { setDataChanged, setPopUp } = props;

	return (
		<div style={popUpPositionStyle}>
			<div style={topContainerStyle}>
				<div style={popUpWindowStyle}>
					<div style={titleStyle}>Batch Delete Tasks</div>
					<div style={subContainerStyle}>TEST</div>
					<div style={finalContainerStyle}>
						<ColorButton text={'Delete Tasks'} onClick={() => null} />
					</div>
					<button style={cancelButtonStyle} onClick={() => setPopUp(null)}>
						×
					</button>
				</div>
			</div>
		</div>
	);
};

export default BatchDeleteTasks;
