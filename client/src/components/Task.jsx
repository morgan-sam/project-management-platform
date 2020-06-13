import React, { useContext } from 'react';
import DataCell from 'components/DataCell';
import ThemeContext from 'context/ThemeContext';
import { parseISOToLittleEndian } from 'processing/parseDates';
import { cellStyles, getHighlightCellStyle } from 'styling/dataCell';
import { getTrueObjVals } from 'processing/utility';

const Task = (props) => {
	const themeColor = useContext(ThemeContext);

	const dragSelectionFunctions = {
		onMouseDown: () => {
			props.setSelecting(!props.selected);
			props.setInitialID(props.item.id);
		},
		onMouseOver: (e) => {
			if (e.buttons === 1) {
				props.newTaskHover(props.item.id);
			}
		},
		onMouseLeave: (e) => {
			if (props.initialID === props.item.id && e.buttons === 1) {
				props.setSelectState(props.item.id, props.selecting);
			}
		}
	};

	const getDataCellText = (type) => {
		if (type === 'selected' && props.selected) return 'X';
		else if (type === 'date' || type === 'deadline') return parseISOToLittleEndian(props.item[type]);
		else if (type === 'teams') return props.item[type].join(' ');
		else return props.item[type];
	};

	const getDataCell = (type, i) => {
		return (
			<DataCell
				key={i}
				onClick={clickFunctions[type]}
				className={`${type}Cell`}
				text={getDataCellText(type)}
				style={{ ...cellStyles[type], ...(props.selected ? getHighlightCellStyle(themeColor) : null) }}
				{...props}
				{...dragSelectionFunctions}
			/>
		);
	};

	const clickFunctions = {
		task: () => props.toggleSelectState(props.item.id),
		completed: () => props.setEntryCompletion(props.item, !props.item.completed),
		selected: () => props.toggleSelectState(props.item.id)
	};

	const getAllDataCells = () => getTrueObjVals(props.visibleColumns).map((type, i) => getDataCell(type, i));

	return <tr className="taskEntry">{getAllDataCells()}</tr>;
};

export default React.memo(Task);
