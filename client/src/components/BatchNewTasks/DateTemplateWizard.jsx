import React, { useState } from 'react';
import DateSelect from 'components/DateSelect';
import Checkbox from 'components/Checkbox';
import Dropdown from 'components/Dropdown';
import ColorButton from 'components/ColorButton';
import { getDayFromTodayAsISO } from 'data/dates';
import { parseISOToDateObj } from 'processing/dates';
import { CancelButton, popUpWindowStyle } from 'styling/popUp';
import { capitalizeFirstLetter } from 'processing/utility';
import {
    mainGridContainer,
    getSectionOpacityStyle,
    topContainer,
    topLeftContainer,
    bottomLeftContainer,
    topRightContainer,
    bottomRightContainer,
    bottomContainer,
    containerItemStyle,
    getSubGridStyle
} from 'styling/wizardStyles';

const DateTemplateWizard = (props) => {
    const { setScreen, setTemplate, template, screen } = props;
    const [date, setDate] = useState(parseISOToDateObj(getDayFromTodayAsISO()));
    const [sequence, setSequence] = useState('none');
    const [step, setStep] = useState('d');
    const [amount, setAmount] = useState(1);

    const generateDateTemplate = () => {
        let template = '${';
        template += Object.values(date).join('/');
        template += '}';
        if (sequence === 'none') return template;
        template += sequence;
        template += amount;
        template += `n${step}`;
        return template;
    };

    const shortStepToFull = (step) => {
        if (step === 'd') return 'Day';
        if (step === 'w') return 'Week';
        if (step === 'm') return 'Month';
        if (step === 'y') return 'Year';
    };

    return (
        <div style={popUpWindowStyle}>
            <div style={topContainer}>{`Generate ${capitalizeFirstLetter(
                screen.replace(/Wizard/, '')
            )} Template`}</div>
            <div style={mainGridContainer}>
                <div style={topLeftContainer}>
                    <div style={containerItemStyle}>Initial Date:</div>
                    <DateSelect
                        date={date}
                        setDate={setDate}
                        style={{
                            ...containerItemStyle,
                            zIndex: '10'
                        }}
                    />
                </div>
                <div style={bottomLeftContainer}>
                    <div style={containerItemStyle}>Sequence:</div>
                    <div
                        style={{
                            ...getSubGridStyle(2, 2),
                            ...containerItemStyle
                        }}
                    >
                        <div style={{ gridArea: '1 / 1 / 2 / 2' }}>None:</div>
                        <Checkbox
                            style={{ gridArea: '1 / 2 / 2 / 3' }}
                            default={sequence === 'none'}
                            onChange={() => setSequence('none')}
                        />
                        <div style={{ gridArea: ' 2 / 1 / 3 / 2' }}>
                            Forwards:
                        </div>
                        <Checkbox
                            style={{ gridArea: ' 2 / 2 / 3 / 3' }}
                            default={sequence === '+'}
                            onChange={() => setSequence('+')}
                        />
                        <div style={{ gridArea: ' 3 / 1 / 4 / 2' }}>
                            Backwards:
                        </div>
                        <Checkbox
                            style={{ gridArea: ' 3 / 2 / 4 / 3' }}
                            default={sequence === '-'}
                            onChange={() => setSequence('-')}
                        />
                    </div>
                </div>
                <div
                    style={{
                        ...topRightContainer,
                        ...getSectionOpacityStyle(sequence === 'none')
                    }}
                >
                    <div style={containerItemStyle}>Step:</div>
                    <div
                        style={{
                            ...getSubGridStyle(2, 4),
                            ...containerItemStyle
                        }}
                    >
                        <div style={{ gridArea: '1 / 1 / 2 / 2' }}>Day:</div>
                        <Checkbox
                            style={{ gridArea: '1 / 2 / 2 / 3' }}
                            default={step === 'd'}
                            onChange={() => setStep('d')}
                        />
                        <div style={{ gridArea: '2 / 1 / 3 / 2' }}>Week:</div>
                        <Checkbox
                            style={{ gridArea: '2 / 2 / 3 / 3' }}
                            default={step === 'w'}
                            onChange={() => setStep('w')}
                        />
                        <div style={{ gridArea: ' 3 / 1 / 4 / 2' }}>Month:</div>
                        <Checkbox
                            style={{ gridArea: ' 3 / 2 / 4 / 3' }}
                            default={step === 'm'}
                            onChange={() => setStep('m')}
                        />
                        <div style={{ gridArea: '4 / 1 / 5 / 2' }}>Year:</div>
                        <Checkbox
                            style={{ gridArea: '4 / 2 / 5 / 3' }}
                            default={step === 'y'}
                            onChange={() => setStep('y')}
                        />
                    </div>
                </div>
                <div
                    style={{
                        ...bottomRightContainer,
                        ...getSectionOpacityStyle(sequence === 'none')
                    }}
                >
                    <div
                        style={containerItemStyle}
                    >{`Amount Of ${shortStepToFull(step)}s:`}</div>
                    <Dropdown
                        className="dropdown"
                        selected={amount}
                        style={{
                            alignItems: 'center',
                            zIndex: '9',
                            width: '2rem',
                            padding: '3rem'
                        }}
                        options={[...Array(11).keys()].slice(1)}
                        onClick={(val) => setAmount(val)}
                    />
                </div>
            </div>
            <div style={bottomContainer}>
                <ColorButton
                    text={'Generate Template'}
                    onClick={() => {
                        const dateTemplate = generateDateTemplate();
                        if (screen === 'dateWizard')
                            setTemplate({ ...template, date: dateTemplate });
                        if (screen === 'deadlineWizard')
                            setTemplate({
                                ...template,
                                deadline: dateTemplate
                            });
                        setScreen('main');
                    }}
                />
            </div>
            <CancelButton onClick={() => setScreen('main')}>×</CancelButton>
        </div>
    );
};

export default DateTemplateWizard;
