import React from 'react';
import Cell from './Cell';

import { parseISOToLittleEndian } from '../processing/parseDates';

const Task = (props) => {
	const setCompletedState = async (item) => {
		const newItem = { ...item, completed: !item.completed };
		try {
			fetch(`/tasks/${item.id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(newItem)
			});
			props.setDataChanged(true);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="taskEntry">
			<Cell className="tableCell taskCell" text={props.item.task} />
			<Cell className="tableCell dateCell" text={parseISOToLittleEndian(props.item.date)} />
			<Cell className="tableCell deadlineCell" text={parseISOToLittleEndian(props.item.deadline)} />
			<Cell className="tableCell urgencyCell" text={props.item.urgency} />
			<Cell className="tableCell teamCell" text={props.item.team} />
			<Cell
				className="tableCell completedCell"
				text={props.item.completed}
				onClick={() => setCompletedState(props.item)}
			/>
			<Cell
				className="tableCell selectedCell"
				text={props.selected ? 'X' : ''}
				onClick={() => props.setSelect(props.item.id)}
			/>
		</div>
	);
};

export default Task;
