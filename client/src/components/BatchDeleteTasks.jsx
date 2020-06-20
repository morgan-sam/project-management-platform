import React, { useState } from 'react';
import MainScreen from 'components/BatchDeleteTasks/MainScreen';
import ViewMatchedTasks from 'components/BatchDeleteTasks/ViewMatchedTasks';
import { popUpPositionStyle } from 'styling/popUp';

const BatchDeleteTasks = (props) => {
	const [ screen, setScreen ] = useState('main');
	const [ finalMatched, setFinalMatched ] = useState([]);

	return (
		<div style={popUpPositionStyle}>
			{screen === 'main' && <MainScreen {...props} {...{ finalMatched, setFinalMatched, setScreen }} />}
			{screen === 'matched' && <ViewMatchedTasks {...props} {...{ finalMatched, setScreen }} />}
		</div>
	);
};

export default BatchDeleteTasks;
