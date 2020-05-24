import React from 'react';
import HeadingCell from 'components/HeadingCell';
import { headingCellStyles } from 'styling/headingCell';
import { capitalizeFirstLetter } from 'processing/utility';
import { fields } from 'data/table';

const TableHeadings = (props) => {
	const sortArrow = props.sortOptions.reversed ? '↓' : '↑';

	const getHeadingCell = (type, i) => {
		const text =
			type === 'selected'
				? `${props.sortOptions.type === 'selected' ? sortArrow : 'X'}`
				: `${type} ${props.sortOptions.type === type ? sortArrow : ''}`;
		return (
			<HeadingCell
				key={i}
				className={`${type}Cell`}
				text={capitalizeFirstLetter(text)}
				onClick={() => props.userSetSort(type)}
				style={headingCellStyles[type]}
			/>
		);
	};

	const getHeadingCellArray = () => fields.map((el, i) => getHeadingCell(el, i));

	return (
		<tr className="tableHeadings" style={{ cursor: 'pointer', userSelect: 'none' }}>
			{getHeadingCellArray()}
		</tr>
	);
};

export default TableHeadings;
