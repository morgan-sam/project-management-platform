import React from 'react';
import HeadingCell from 'components/HeadingCell';
import { headingCellStyles } from 'styling/headingCell';
import { capitalizeFirstLetter } from 'processing/utility';

const TableHeadings = (props) => {
	const sortArrow = props.sortOptions.reversed ? '↓' : '↑';

	const getHeadingCell = (type) => {
		const text =
			type === 'selected'
				? `${props.sortOptions.type === 'selected' ? sortArrow : 'X'}`
				: `${type} ${props.sortOptions.type === type ? sortArrow : ''}`;
		return (
			<HeadingCell
				className={`${type}Cell`}
				text={capitalizeFirstLetter(text)}
				onClick={() => props.userSetSort(type)}
				style={headingCellStyles[type]}
			/>
		);
	};

	const getHeadingCellArray = () => {
		const headings = [ 'task', 'date', 'deadline', 'urgency', 'teams', 'completed', 'selected' ];
		return headings.map((el) => getHeadingCell(el));
	};

	return (
		<tr className="tableHeadings" style={{ cursor: 'pointer', userSelect: 'none' }}>
			{getHeadingCellArray()}
		</tr>
	);
};

export default TableHeadings;
