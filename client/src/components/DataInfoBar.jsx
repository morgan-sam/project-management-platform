import React, { useState } from 'react';
import { getTaskBarHiddenStyle, getTaskBarVisibleStyle } from 'styling/taskBars';

const DataInfoBar = (props) => {
	const { style, dataChanged, displayedBars, setDisplayedBars } = props;

	return (
		<div>
			<div
				className="dataInfoBar"
				style={{
					...style,
					...(displayedBars.dataInfo ? getTaskBarVisibleStyle(false) : getTaskBarHiddenStyle(false))
				}}
			>
				{'HELLO'}
			</div>
		</div>
	);
};

export default DataInfoBar;
