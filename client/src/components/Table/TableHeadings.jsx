import React from 'react';
import HeadingCell from 'components/Cells/HeadingCell';
import { headingCellStyles } from 'styling/headingCell';
import { capitalizeFirstLetter } from 'processing/utility';
import { getTrueObjVals } from 'processing/utility';
import styled from '@emotion/styled';

const TableHeadingsElement = styled.tr`
    cursor: pointer;
    user-select: none;
`;

const TableHeadings = (props) => {
    const { sortOptions, userSetSort, visibleColumns } = props;

    const sortArrow = sortOptions.reversed ? '↓' : '↑';

    const getHeadingCell = (type, i) => {
        const text =
            type === 'selected'
                ? `${sortOptions.type === 'selected' ? sortArrow : 'X'}`
                : `${type} ${sortOptions.type === type ? sortArrow : ''}`;
        return (
            <HeadingCell
                key={i}
                className={`${type}Cell`}
                text={
                    text.match(/^id/)
                        ? text.replace(/^id/, 'ID')
                        : capitalizeFirstLetter(text)
                }
                onClick={() => userSetSort(type)}
                style={headingCellStyles[type]}
            />
        );
    };

    const getHeadingCellArray = () =>
        getTrueObjVals(visibleColumns).map((el, i) => getHeadingCell(el, i));

    return <TableHeadingsElement>{getHeadingCellArray()}</TableHeadingsElement>;
};

export default TableHeadings;
