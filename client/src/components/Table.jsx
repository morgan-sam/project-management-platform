import React, { useEffect } from 'react';
import TableEntries from 'components/Table/TableEntries';
import TableHeadings from 'components/Table/TableHeadings';
import NoDataDisplay from 'components/Table/NoDataDisplay';
import { getParentsClassList } from 'processing/classnames';
import styled from '@emotion/styled';

export const TableElement = styled.table`
    margin: 0 0 3rem 0;
    border-collapse: separate;

    & > * > * > *:last-child {
        border-right: var(--line-thickness) solid var(--line-color);
    }

    & > *:last-child > tr:last-child > * {
        border-bottom: var(--line-thickness) solid var(--line-color);
    }

    & > *:first-child > tr:first-child > *:first-child {
        border-top-left-radius: var(--line-curve);
    }

    & > *:first-child > tr:first-child > *:last-child {
        border-top-right-radius: var(--line-curve);
    }

    & > *:last-child > tr:last-child > *:first-child {
        border-bottom-left-radius: var(--line-curve);
    }

    & > *:last-child > tr:last-child > *:last-child {
        border-bottom-right-radius: var(--line-curve);
    }
`;

const Table = (props) => {
    const {
        taskList,
        setSelectedTasks,
        sortOptions,
        userSetSort,
        visibleColumns
    } = props;

    useEffect(() => {
        const handleClickOutside = (e) => {
            const clickClasses = getParentsClassList(e.target);
            if (clickClasses === '') return;
            const legalClasses = ['dataCell', 'popUp', 'overlay', 'navMenu'];
            const conditions = legalClasses.map((el) =>
                Boolean(clickClasses.match(el))
            );
            if (!conditions.includes(true)) setSelectedTasks([]);
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () =>
            document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <TableElement>
            <thead>
                <TableHeadings
                    {...{ sortOptions, userSetSort, visibleColumns }}
                />
            </thead>
            <tbody>
                <TableEntries {...props} />
            </tbody>
            {taskList.length === 0 && <NoDataDisplay {...{ visibleColumns }} />}
        </TableElement>
    );
};

export default Table;
