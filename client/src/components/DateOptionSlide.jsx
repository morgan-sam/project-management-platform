import React, { useState } from 'react';
import DateSelect from 'components/DateSelect';
import { parseDateObjToISO } from 'processing/dates';
import {
    DateSelectConfirmContainer,
    DateOptionSlideContainer,
    DateDisplayBox,
    DateSelectButton,
    CanConContainer
} from 'styling/dateOption';

const DateOptionSlide = (props) => {
    const [internalDateChange, setInternalDateChange] = useState(false);
    const [backupDate, setBackupDate] = useState(props.date);
    const [showDateSelect, setShowDateSelect] = useState(false);
    const [overflowHidden, setOverflowHidden] = useState(true);

    return (
        <DateOptionSlideContainer
            showDateSelect={showDateSelect}
            overflowHidden={overflowHidden}
        >
            <DateDisplayBox
                {...{ showDateSelect }}
                onClick={() => {
                    setShowDateSelect(true);
                    if (props.setPopUpOpen) props.setPopUpOpen(true);
                }}
            >
                {props.date.day}/{props.date.month}/{props.date.year}
            </DateDisplayBox>

            <DateSelectConfirmContainer showDateSelect={showDateSelect}>
                <DateSelect
                    setDate={(date) => {
                        setInternalDateChange(true);
                        props.setSelectDate(parseDateObjToISO(date));
                    }}
                    date={props.date}
                    setOverflowHidden={(val) => {
                        props.setOverflowHidden(val);
                        setOverflowHidden(val);
                    }}
                />

                <CanConContainer>
                    <DateSelectButton
                        cancel
                        onClick={() => {
                            setShowDateSelect(false);
                            if (props.setPopUpOpen) props.setPopUpOpen(false);
                            if (internalDateChange)
                                props.setSelectDate(
                                    parseDateObjToISO(backupDate)
                                );
                            setInternalDateChange(false);
                        }}
                        tabIndex="-1"
                    >
                        ×
                    </DateSelectButton>
                    <DateSelectButton
                        confirm
                        onClick={() => {
                            setShowDateSelect(false);
                            if (props.setPopUpOpen) props.setPopUpOpen(false);
                            setBackupDate(props.date);
                            setInternalDateChange(false);
                        }}
                        tabIndex="-1"
                    >
                        ✓
                    </DateSelectButton>
                </CanConContainer>
            </DateSelectConfirmContainer>
        </DateOptionSlideContainer>
    );
};

export default DateOptionSlide;
