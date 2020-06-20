import React, { useEffect } from 'react';
import TableEntries from 'components/Table/TableEntries';
import TableHeadings from 'components/Table/TableHeadings';
import NoDataDisplay from 'components/Table/NoDataDisplay';
import { getParentsClassList } from 'processing/classnames';

const Table = (props) => {
	const { taskList, setSelectedTasks, sortOptions, userSetSort, visibleColumns } = props;

	useEffect(() => {
		const handleClickOutside = (e) => {
			const clickClasses = getParentsClassList(e.target);
			if (clickClasses === '') return;
			const legalClasses = [ 'dataCell', 'taskManagerBtn', 'popUp', 'overlay', 'navMenu' ];
			const conditions = legalClasses.map((el) => Boolean(clickClasses.match(el)));
			if (!conditions.includes(true)) setSelectedTasks([]);
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	return (
		<table className="table" style={props.style}>
			<thead>
				<TableHeadings {...{ sortOptions, userSetSort, visibleColumns }} />
			</thead>
			<tbody>
				<TableEntries {...props} />
			</tbody>
			{taskList.length === 0 && <NoDataDisplay {...{ visibleColumns }} />}
		</table>
	);
};

export default Table;
