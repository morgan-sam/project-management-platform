import React, { useContext } from 'react';
import DataCell from 'components/DataCell';
import ThemeContext from 'context/ThemeContext';
import { parseISOToLittleEndian } from 'processing/parseDates';
import { cellStyles, getHighlightCellStyle } from 'styling/dataCell';
import { getTrueObjVals } from 'processing/utility';

const Task = (props) => {
	const {
		setSelecting,
		setInitialID,
		newTaskHover,
		initialID,
		setSelectState,
		item,
		selecting,
		selected,
		toggleSelectState,
		setEntryCompletion,
		visibleColumns
	} = props;

	const themeColor = useContext(ThemeContext);

	const dragSelectionFunctions = {
		onMouseDown: () => {
			setSelecting(!selected);
			setInitialID(item.id);
		},
		onMouseOver: (e) => {
			if (e.buttons === 1) {
				newTaskHover(item.id);
			}
		},
		onMouseLeave: (e) => {
			if (initialID === item.id && e.buttons === 1) {
				setSelectState(item.id, selecting);
			}
		}
	};

	const getDataCellText = (type) => {
		if (type === 'selected' && selected) return 'X';
		else if (type === 'date' || type === 'deadline') return parseISOToLittleEndian(item[type]);
		else if (type === 'teams') return item[type].join(' ');
		else return item[type];
	};

	const getDataCell = (type, i) => {
		return (
			<DataCell
				key={i}
				onClick={clickFunctions[type]}
				className={`${type}Cell`}
				text={getDataCellText(type)}
				style={{ ...cellStyles[type], ...(selected ? getHighlightCellStyle(themeColor) : null) }}
				{...props}
				{...dragSelectionFunctions}
			/>
		);
	};

	const clickFunctions = {
		task: () => toggleSelectState(item.id),
		completed: () => setEntryCompletion(item, !item.completed),
		selected: () => toggleSelectState(item.id)
	};

	const getAllDataCells = () => getTrueObjVals(visibleColumns).map((type, i) => getDataCell(type, i));

	return <tr className="taskEntry">{getAllDataCells()}</tr>;
};

export default React.memo(Task);
