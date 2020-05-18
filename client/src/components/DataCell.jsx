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
			onClick={() => (props.onClick ? props.onClick() : null)}
			style={{ ...props.style, userSelect: 'none' }}
			onMouseOver={(val) => {
				if (props.onMouseOver) props.onMouseOver(val);
			}}
			onMouseLeave={(val) => {
				if (props.onMouseLeave) props.onMouseLeave(val);
			}}
			onMouseDown={(val) => {
				if (props.onMouseDown) props.onMouseDown(val);
			}}
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
