import React, { useState } from 'react';
import DateSelect from 'components/DateSelect';
import Checkbox from 'components/Checkbox';
import Dropdown from 'components/Dropdown';
import ColorButton from 'components/ColorButton';
import { getDayFromTodayAsISO } from 'data/dates';
import { parseISOToDateObj } from 'processing/dates';
import { CancelButton, PopUpWindow } from 'styling/popUp';
import { capitalizeFirstLetter } from 'processing/utility';
import {
    FourByFourGrid,
    DisabledContainer,
    WizardTitle,
    BottomContainer,
    containerItemStyle,
    Grid
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
        <PopUpWindow>
            <WizardTitle>{`Generate ${capitalizeFirstLetter(
                screen.replace(/Wizard/, '')
            )} Template`}</WizardTitle>
            <FourByFourGrid>
                <div>
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
                <div>
                    <div style={containerItemStyle}>Sequence:</div>
                    <Grid rows={2} columns={2} style={containerItemStyle}>
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
                    </Grid>
                </div>
                <DisabledContainer disabled={sequence === 'none'}>
                    <div style={containerItemStyle}>Step:</div>
                    <Grid rows={4} columns={2} style={containerItemStyle}>
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
                    </Grid>
                </DisabledContainer>
                <DisabledContainer disabled={sequence === 'none'}>
                    <div
                        style={containerItemStyle}
                    >{`Amount Of ${shortStepToFull(step)}s:`}</div>
                    <Dropdown
                        width={2}
                        className="dropdown"
                        selected={amount}
                        style={{
                            alignItems: 'center',
                            zIndex: '9',
                            padding: '3rem'
                        }}
                        options={[...Array(11).keys()].slice(1)}
                        onClick={(val) => setAmount(val)}
                    />
                </DisabledContainer>
            </FourByFourGrid>
            <BottomContainer>
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
            </BottomContainer>
            <CancelButton onClick={() => setScreen('main')}>×</CancelButton>
        </PopUpWindow>
    );
};

export default DateTemplateWizard;
