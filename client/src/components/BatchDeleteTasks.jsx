import React, { useState } from 'react';
import MainScreen from 'components/BatchDeleteTasks/MainScreen';
import ViewMatchedTasks from 'components/BatchDeleteTasks/ViewMatchedTasks';
import { popUpPositionStyle } from 'styling/popUp';

const BatchDeleteTasks = (props) => {
	const [ screen, setScreen ] = useState('main');

	return (
		<div style={popUpPositionStyle}>
			{screen === 'main' && <MainScreen {...props} setScreen={setScreen} />}
			{screen === 'matched' && <ViewMatchedTasks />}
		</div>
	);
};

export default BatchDeleteTasks;
