import React, { useContext } from 'react';
import DataCell from 'components/DataCell';
import ThemeContext from 'context/ThemeContext';
import { parseISOToLittleEndian } from 'processing/dates';
import { cellStyles, getHighlightCellStyle } from 'styling/dataCell';
import { getTrueObjVals } from 'processing/utility';

const Task = (props) => {
	console.log('Task Rerendered');
	const {
		item,
		selected,
		updateDragStart,
		updateDragEnd,
		updateDragHeld,
		setEntryCompletion,
		visibleColumns
	} = props;
	const themeColor = useContext(ThemeContext);

	const dragSelectionFunctions = {
		onMouseDown: () => {
			updateDragStart(item.id);
			updateDragEnd(item.id);
			updateDragHeld(true);
		},
		onMouseOver: (e) => (e.buttons === 1 ? updateDragEnd(item.id) : null),
		onMouseLeave: () => null,
		onMouseUp: () => updateDragHeld(false)
	};

	const getDataCellText = (type) => {
		if (type === 'selected' && selected) return 'X';
		else if (type === 'date' || type === 'deadline') return parseISOToLittleEndian(item[type]);
		else if (type === 'teams') return item[type].join(' ');
		else return item[type];
	};

	const clickFunctions = {
		completed: () => setEntryCompletion(item, !item.completed)
	};

	const getDataCell = (type, i) => {
		const cellText = getDataCellText(type);
		const cellStyle = { ...cellStyles[type], ...(selected ? getHighlightCellStyle(themeColor) : null) };
		const dragFns = type === 'task' || type === 'selected' ? dragSelectionFunctions : null;
		return (
			<DataCell
				key={i}
				onClick={clickFunctions[type]}
				className={`${type}Cell`}
				text={cellText}
				style={cellStyle}
				{...props}
				{...dragFns}
			/>
		);
	};

	const getAllDataCells = () => getTrueObjVals(visibleColumns).map((type, i) => getDataCell(type, i));

	return <tr className="taskEntry">{getAllDataCells()}</tr>;
};

export default React.memo(Task);
