import React from 'react';
import DateOptionSlide from 'components/DateOptionSlide';
import styled from '@emotion/styled';

const DateRangeSelectContainer = styled.div`
    display: flex;
    align-items: center;
    & > * {
        margin: 0 1rem;
    }
`;

const DateRangeSelect = (props) => {
    return (
        <DateRangeSelectContainer>
            <div className="filterBarLabel">Date:</div>
            <DateOptionSlide
                {...props}
                setSelectDate={(val) => props.setDate(val)}
                date={props.date}
            />
            <div className="filterBarLabel">Deadline:</div>
            <DateOptionSlide
                {...props}
                setSelectDate={(val) => props.setDeadline(val)}
                date={props.deadline}
            />
        </DateRangeSelectContainer>
    );
};

export default DateRangeSelect;
