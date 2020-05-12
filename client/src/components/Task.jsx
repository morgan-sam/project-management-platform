import React, { useContext } from 'react';
import DataCell from 'components/DataCell';
import ThemeContext from 'context/ThemeContext';
import { parseISOToLittleEndian } from 'processing/parseDates';
import {
	taskCell,
	dateCell,
	deadlineCell,
	urgencyCell,
	teamCell,
	completedCell,
	selectionCell,
	getHighlightCellStyle
} from 'styling/dataCell';

const Task = (props) => {
	const themeColor = useContext(ThemeContext);
	return (
		<tr className="taskEntry">
			<DataCell
				className="taskCell"
				text={props.item.task}
				style={{ ...taskCell, ...(props.selected ? getHighlightCellStyle(themeColor) : null) }}
				onClick={() => props.toggleSelectState(props.item.id)}
			/>
			<DataCell
				className="dateCell"
				text={parseISOToLittleEndian(props.item.date)}
				style={{ ...dateCell, ...(props.selected ? getHighlightCellStyle(themeColor) : null) }}
			/>
			<DataCell
				className="deadlineCell"
				text={parseISOToLittleEndian(props.item.deadline)}
				style={{ ...deadlineCell, ...(props.selected ? getHighlightCellStyle(themeColor) : null) }}
			/>
			<DataCell
				className="urgencyCell"
				text={props.item.urgency}
				style={{ ...urgencyCell, ...(props.selected ? getHighlightCellStyle(themeColor) : null) }}
			/>
			<DataCell
				className="teamCell"
				text={props.item.team}
				style={{ ...teamCell, ...(props.selected ? getHighlightCellStyle(themeColor) : null) }}
			/>
			<DataCell
				className="completedCell"
				text={props.item.completed}
				onClick={() => props.setEntryCompletion(props.item, !props.item.completed)}
				style={{ ...completedCell, ...(props.selected ? getHighlightCellStyle(themeColor) : null) }}
			/>
			<DataCell
				className="selectionCell"
				text={props.selected ? 'X' : ''}
				onMouseDown={() => {
					props.setSelecting(!props.selected);
					props.setInitialID(props.item.id);
				}}
				onClick={() => props.toggleSelectState(props.item.id)}
				style={{ ...selectionCell, ...(props.selected ? getHighlightCellStyle(themeColor) : null) }}
				onMouseOver={(e) => {
					if (e.buttons === 1) {
						props.setSelectState(props.item.id, props.selecting);
					}
				}}
				onMouseLeave={(e) => {
					if (props.initialID === props.item.id) {
						props.setSelectState(props.item.id, props.selecting);
					}
				}}
			/>
		</tr>
	);
};

export default Task;
