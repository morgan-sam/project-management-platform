import React from 'react';
import ClickableCellText from 'components/ClickableCellText';

const DataCell = (props) => {
	const { setFilterOptions, text, filterOptions } = props;

	const clickableCell =
		props.className === 'dateCell' ||
		props.className === 'deadlineCell' ||
		props.className === 'urgencyCell' ||
		props.className === 'teamsCell';

	return (
		<td
			className={`dataCell ${props.className}`}
			style={{ ...props.style, userSelect: 'none' }}
			onClick={() => (props.onClick ? props.onClick() : null)}
			onMouseOver={(val) => (props.onMouseOver ? props.onMouseOver(val) : null)}
			onMouseLeave={(val) => (props.onMouseLeave ? props.onMouseLeave(val) : null)}
			onMouseDown={(val) => (props.onMouseDown ? props.onMouseDown(val) : null)}
			onMouseUp={(val) => (props.onMouseUp ? props.onMouseUp(val) : null)}
		>
			{text === true ? (
				'✓'
			) : clickableCell ? (
				<ClickableCellText
					cellType={props.className.replace(/Cell/, '')}
					text={text}
					filterOptions={filterOptions}
					setFilterOptions={setFilterOptions}
					color={props.style.color}
					selected={props.selected}
				/>
			) : (
				text
			)}
		</td>
	);
};

export default DataCell;
