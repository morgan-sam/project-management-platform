import React from 'react';
import ClickableCellText from 'components/ClickableCellText';

const DataCell = (props) => {
    const { setFilterOptions, text, filterOptions, selected } = props;
    const color = props.style.color;

    const clickableCell =
        props.className === 'dateCell' ||
        props.className === 'deadlineCell' ||
        props.className === 'urgencyCell' ||
        props.className === 'teamsCell';

    return (
        <td
            className={`dataCell ${props.className}`}
            style={{ ...props.style, userSelect: 'none' }}
            onClick={props.onClick}
            onMouseOver={props.onMouseOver}
            onMouseLeave={props.onMouseLeave}
            onMouseDown={props.onMouseDown}
            onMouseUp={props.onMouseUp}
        >
            {text === true ? (
                '✓'
            ) : clickableCell ? (
                <ClickableCellText
                    cellType={props.className.replace(/Cell/, '')}
                    {...{
                        text,
                        filterOptions,
                        setFilterOptions,
                        color,
                        selected
                    }}
                />
            ) : (
                text
            )}
        </td>
    );
};

export default DataCell;
