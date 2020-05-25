import React, { useState } from 'react';
import { getTaskBarHiddenStyle, getTaskBarVisibleStyle } from 'styling/taskBars';
import { dataInfoBarStyle } from 'styling/dataInfoBar';

const DataInfoBar = (props) => {
	const { style, dataChanged, displayedBars, setDisplayedBars } = props;

	return (
		<div>
			<div
				className="dataInfoBar"
				style={{
					...dataInfoBarStyle,
					...(displayedBars.dataInfo ? getTaskBarVisibleStyle(false) : getTaskBarHiddenStyle(false))
				}}
			>
				{'HELLO'}
			</div>
		</div>
	);
};

export default DataInfoBar;
