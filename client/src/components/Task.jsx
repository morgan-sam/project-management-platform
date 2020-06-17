import React, { useContext, useCallback } from 'react';
import DataCell from 'components/DataCell';
import ThemeContext from 'context/ThemeContext';
import { parseISOToLittleEndian } from 'processing/parseDates';
import { cellStyles, getHighlightCellStyle } from 'styling/dataCell';
import { getTrueObjVals } from 'processing/utility';

const Task = (props) => {
	console.log('Task Rerendered');
	const {
		setSelecting,
		setInitialID,
		newTaskHover,
		initialID,
		setSelectState,
		item,
		selecting,
		selected,
		changeSelectState,
		setEntryCompletion,
		visibleColumns
	} = props;

	const themeColor = useContext(ThemeContext);

	const dragSelectionFunctions = {
		onMouseDown: () => setInitialID(item.id),
		onMouseOver: (e) => (e.buttons === 1 ? newTaskHover(item.id) : null),
		onMouseLeave: (e) => null,
		onMouseUp: () => null
	};

	const getDataCellText = (type) => {
		if (type === 'selected' && selected) return 'X';
		else if (type === 'date' || type === 'deadline') return parseISOToLittleEndian(item[type]);
		else if (type === 'teams') return item[type].join(' ');
		else return item[type];
	};

	const clickFunctions = {
		task: () => changeSelectState(item.id),
		completed: () => setEntryCompletion(item, !item.completed),
		selected: () => changeSelectState(item.id)
	};

	const getDataCell = (type, i) => {
		const cellText = getDataCellText(type);
		const cellStyle = { ...cellStyles[type], ...(selected ? getHighlightCellStyle(themeColor) : null) };
		return (
			<DataCell
				key={i}
				onClick={clickFunctions[type]}
				className={`${type}Cell`}
				text={cellText}
				style={cellStyle}
				{...props}
				{...dragSelectionFunctions}
			/>
		);
	};

	const getAllDataCells = () => getTrueObjVals(visibleColumns).map((type, i) => getDataCell(type, i));

	return <tr className="taskEntry">{getAllDataCells()}</tr>;
};

export default React.memo(Task);
