import React from 'react';
import { getTaskBarHiddenStyle, getTaskBarVisibleStyle } from 'styling/taskBars';
import { dataInfoBarStyle } from 'styling/dataInfoBar';
import { getBoundaryDates } from 'data/dates';
import { parseISOToLittleEndian } from 'processing/dates';

const DataInfoBar = (props) => {
	const { displayedBars, rawTaskList, taskList, filterOptions } = props;

	const getDateRangeText = () => {
		if (taskList.length) {
			const boundaryDates = getBoundaryDates(taskList);
			return `Date Range: ${parseISOToLittleEndian(boundaryDates.date)} to ${parseISOToLittleEndian(
				boundaryDates.deadline
			)}`;
		} else return 'No Data';
	};

	const textBox = {
		padding: '1rem',
		margin: '1rem',
		border: '1px solid black'
	};

	const filterText = `Filter is ${filterOptions.active ? '' : 'not'} active`;
	const taskCountText = `Showing  ${taskList.length} out of ${rawTaskList.length} tasks in database`;

	return (
		<div
			className="dataInfoBar"
			style={{
				...dataInfoBarStyle,
				...(displayedBars.dataInfo ? getTaskBarVisibleStyle(false) : getTaskBarHiddenStyle(false)),
				overflow: 'hidden',
				alignItems: 'stretch'
			}}
		>
			<div style={textBox}>{filterText}</div>
			<div style={textBox}>{taskCountText}</div>
			<div style={textBox}>{getDateRangeText()}</div>
		</div>
	);
};

export default DataInfoBar;
