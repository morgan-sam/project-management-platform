import React from 'react';
import Dropdown from 'components/Dropdown';
import {
    getMonthIntegers,
    arrayOfMonthDays,
    get21stCenturyYears
} from 'data/dates';
import { DateSelectElement } from 'styling/dateSelect';

const DateSelect = (props) => {
    return (
        <DateSelectElement className="dateSelect" style={{ ...props.style }}>
            <div className="dropdownLabel">Day</div>
            <div className="dropdownLabel">Month</div>
            <div className="dropdownLabel">Year</div>
            <Dropdown
                width={3}
                selected={props.date.day}
                options={arrayOfMonthDays(props.date.month, props.date.year)}
                onClick={(val) => {
                    props.setDate({ ...props.date, day: val });
                }}
                onOpenChange={props.setOverflowHidden}
            />
            <Dropdown
                width={3}
                selected={props.date.month}
                options={getMonthIntegers()}
                onClick={(val) => {
                    props.setDate({ ...props.date, month: val });
                }}
                onOpenChange={props.setOverflowHidden}
            />
            <Dropdown
                width={5}
                selected={props.date.year}
                options={get21stCenturyYears()}
                onClick={(val) => {
                    props.setDate({ ...props.date, year: val });
                }}
                onOpenChange={props.setOverflowHidden}
            />
        </DateSelectElement>
    );
};

export default DateSelect;
