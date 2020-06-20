import React, { useState } from 'react';
import MainBatchDeleteScreen from 'components/MainBatchDeleteScreen';
import MatchedDeleteTasks from 'components/MatchedDeleteTasks';
import { popUpPositionStyle } from 'styling/popUp';

const BatchDeleteTasks = (props) => {
	const [ screen, setScreen ] = useState('main');

	return (
		<div style={popUpPositionStyle}>
			{screen === 'main' && <MainBatchDeleteScreen {...props} setScreen={setScreen} />}
			{screen === 'matched' && <MatchedDeleteTasks />}
		</div>
	);
};

export default BatchDeleteTasks;
