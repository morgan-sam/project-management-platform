import React, { useState } from 'react';
import DateSelect from 'components/DateSelect';
import { parseDateObjToISO } from 'processing/dates';
import {
    DateOptionSlideContainer,
    DateDisplayBox,
    dateSlideStyling,
    canConBtnStyle,
    confirmBtnStyle,
    cancelBtnStyle,
    canConContainerStyle
} from 'styling/dateOption';
import { selectOffscreen, selectOnscreen } from 'styling/dateOptionSlide';

const DateOptionSlide = (props) => {
    const [internalDateChange, setInternalDateChange] = useState(false);
    const [backupDate, setBackupDate] = useState(props.date);
    const [showDateSelect, setShowDateSelect] = useState(false);
    const [overflowHidden, setOverflowHidden] = useState(true);
    console.log(showDateSelect);

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

            <div
                className="dateSelectConfirmContainer"
                style={{
                    transition: '1s',
                    ...(showDateSelect ? selectOnscreen : selectOffscreen)
                }}
            >
                <DateSelect
                    style={{
                        ...dateSlideStyling
                    }}
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

                <div
                    className="canConBtnContainer"
                    style={{ ...canConContainerStyle }}
                >
                    <button
                        className="cancelButton"
                        style={{ ...canConBtnStyle, ...cancelBtnStyle }}
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
                    </button>
                    <button
                        className="confirmButton"
                        style={{ ...canConBtnStyle, ...confirmBtnStyle }}
                        onClick={() => {
                            setShowDateSelect(false);
                            if (props.setPopUpOpen) props.setPopUpOpen(false);
                            setBackupDate(props.date);
                            setInternalDateChange(false);
                        }}
                        tabIndex="-1"
                    >
                        ✓
                    </button>
                </div>
            </div>
        </DateOptionSlideContainer>
    );
};

export default DateOptionSlide;
